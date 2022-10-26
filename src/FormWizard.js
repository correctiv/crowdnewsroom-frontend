import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-jsonschema-form";
import * as _ from "lodash";
import Engine from "json-rules-engine-simplified";
import { CSSTransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";
import { trackPageView } from "./tracking";

import { t } from "./i18n";
import Card from "./Card";
import SignatureWidget from "./formWidgets/SignatureWidget";
import ButtonWidget from "./formWidgets/ButtonWidget";
import AnswerWidget from "./formWidgets/AnswerWidget";
import PatternTypeTextInputWidget from "./formWidgets/PatternTypeTextInputWidget";
import OneLineWidget from "./formWidgets/OneLineWidget";
import ImageUploadWidget from "./formWidgets/ImageUploadWidget";
import LocationWidget from "./formWidgets/LocationWidget";
import "./FormWizard.css";

class FormWizard extends Component {
  static propTypes = {
    currentStep: PropTypes.string,
    steps: PropTypes.arrayOf(PropTypes.object),
    submitCallback: PropTypes.func,
    formData: PropTypes.object,
    formStatus: PropTypes.string
  };

  constructor(props) {
    super(props);
    t.setLocale(props.language);
    const { steps, formData, formStatus, stepsTaken } = props;
    this.state = {
      formData,
      formStatus,
      schema: steps[0].schema,
      step: steps[0],
      stepsTaken: stepsTaken || new Set()
    };
    this.setNextStep = this.setNextStep.bind(this);
    this.transformErrors = this.transformErrors.bind(this);
  }

  updateRoute(step) {
    const url = `./${step.schema.slug}`;
    trackPageView(url);
    this.props.history.push(url);
  }

  getNextStep(formData, rules = this.state.step.rules) {
    const engine = new Engine(rules);
    return engine.run(formData).then(validSteps => {
      return _.find(
        this.props.steps,
        step => step.schema.slug === validSteps[0]
      );
    });
  }

  advance(formData) {
    this.setState({ formData });
    this.getNextStep(formData).then(nextStep => {
      if (
        this.state.step.schema.nextOwnStep &&
        !this.state.step.schema.hideNextButton
      ) {
        var nextStepSlug = this.state.step.schema.nextOwnStep;
        nextStep = this.props.steps.find(function(slide) {
          if (slide.schema.slug === nextStepSlug) {
            return slide;
          } else {
            return "";
          }
        });
      }
      this.setNextStep(nextStep);
      this.updateRoute(nextStep);
    });
  }

  setNextStep(nextStep) {
    console.log(nextStep);
    this.setState({
      step: nextStep,
      stepsTaken: this.state.stepsTaken.add(nextStep.schema.slug)
    });
  }

  resetToFirstStep() {
    const nextStep = this.props.steps[0];
    this.setState({ stepsTaken: new Set() });
    this.setNextStep(nextStep);
    this.updateRoute(nextStep);
  }

  async componentDidMount() {
    const canGetToSelectedStep = await this.canWeGetHere(
      this.props.match.params.step
    );
    if (canGetToSelectedStep) {
      const currentStep = _.find(this.props.steps, step => {
        return step.schema.slug === this.props.match.params.step;
      });
      this.setState({ schema: currentStep.schema, step: currentStep });
    } else {
      this.resetToFirstStep();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.currentStep === this.props.match.params.step)
      return;

    const currentStep = _.find(nextProps.steps, step => {
      return step.schema.slug === nextProps.match.params.step;
    });

    const stepsTaken = Array.from(this.state.stepsTaken);
    const currentIndex = stepsTaken.indexOf(currentStep.schema.slug);

    this.setState({
      stepsTaken: new Set(stepsTaken.slice(0, currentIndex + 1)),
      schema: currentStep.schema,
      step: currentStep
    });
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  onSubmit = ({ formData }) => {
    if (this.state.schema.final) {
      this.props.submitCallback(formData, this.state.stepsTaken);
    } else {
      this.advance(formData);
    }
  };

  get backLink() {
    const stepsTaken = [...this.state.stepsTaken];
    return stepsTaken[stepsTaken.length - 2];
  }

  async descend(formData, rules, stepSlug) {
    let nextStep = await this.getNextStep(formData, rules);
    if (_.isUndefined(nextStep)) {
      return false;
    }
    if (nextStep.schema.slug === stepSlug) {
      return true;
    }
    if (nextStep.schema.final) {
      return false;
    }
    return await this.descend(formData, nextStep.rules, stepSlug);
  }

  maybeAutoAdvance(event) {
    const properties = event.schema.properties;
    const autoFields = new Set(["boolean", "enum"]);
    const propertyNames = _.keys(properties);
    const types = _.uniq(_.map(properties, p => (p.enum ? "enum" : p.type)));
    const fields = new Set(_.keys(event.formData));
    const allFilled = _.every(propertyNames, p => fields.has(p));
    const allAuto = _.every(types, p => autoFields.has(p));
    if (allAuto && allFilled) {
      this.onSubmit(event);
    }
  }

  removeDescription(schema) {
    var new_schema = Object.assign({}, schema);
    delete new_schema.description;
    return new_schema;
  }

  async canWeGetHere(step) {
    if (this.props.steps[0].schema.slug === step) {
      return true;
    }
    return await this.descend(
      this.state.formData,
      this.props.steps[0].rules,
      step
    );
  }

  transformErrors(errors) {
    const uiSchema = _.get(this.props.uiSchema, this.state.schema.slug, {});
    return errors.map(error => {
      // the errors always start with a dot we remove it to get
      // `property` from `.property`
      const propertyName = error.property.slice(1, error.property.length);

      const widget = _.get(uiSchema, [propertyName, "ui:widget"]);
      const isSignature = widget === "signatureWidget";
      if (error.name === "required") {
        error.message = t("errors.required");
      }
      if (error.name === "type" && error.params.type === "boolean") {
        error.message = t("errors.boolean");
      }
      if (error.name === "type" && error.params.type === "answer") {
        error.message = t("errors.answer");
      }
      if (isSignature) {
        error.message = t("errors.signature");
      }
      return error;
    });
  }

  render() {
    const uiSchema = _.get(this.props.uiSchema, this.state.schema.slug, {});
    return (
      <Card
        logo={this.props.investigation.logo}
        title={this.props.investigation.name}
        dataPrivacyUrl={this.props.investigation.data_privacy_url}
      >
        <CSSTransitionGroup
          className="form-wizard__transition-container"
          transitionName="form-wizard__transition"
          transitionEnterTimeout={1300}
          transitionLeaveTimeout={1}
        >
          <h3 className="slide-title">{this.state.schema.title}</h3>
          <div
            className="field-description mt-4"
            dangerouslySetInnerHTML={{ __html: this.state.schema.description }}
          />
          {this.state.formStatus !== "A" && (
            <Form
              key={this.state.schema.slug}
              className="form-wizard__form"
              schema={this.removeDescription(this.state.schema)}
              uiSchema={uiSchema}
              onChange={this.maybeAutoAdvance}
              onSubmit={this.onSubmit}
              formData={this.state.formData}
              widgets={{
                signatureWidget: SignatureWidget,
                buttonWidget: ButtonWidget,
                patternTypeTextInputWidget: PatternTypeTextInputWidget,
                oneLineWidget: OneLineWidget,
                imageUpload: ImageUploadWidget,
                locationWidget: LocationWidget,
                answerWidget: AnswerWidget
              }}
              transformErrors={this.transformErrors}
              showErrorList={false}
            >
              {this.state.stepsTaken.size > 1 && (
                <Link
                  className="btn btn-outline-primary mr-2"
                  to={`./${this.backLink}`}
                >
                  {t("form.back")}
                </Link>
              )}
              {this.state.schema.hideNextButton}
              {!this.state.schema.hideNextButton && (
                <input
                  className="btn btn-primary form-wizard__btn-next"
                  type="submit"
                  v-show="this.state.schema.hideNextButton"
                  value={this.state.schema.nextButtonLabel}
                />
              )}
            </Form>
          )}
        </CSSTransitionGroup>
      </Card>
    );
  }
}
export default FormWizard;
