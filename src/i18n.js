import Polyglot from "node-polyglot";

/* eslint-disable no-unused-vars*/
const en = {
  form: {
    loading: "Loading …",
    error: "There was an error loading the form data …",
    next: "Next",
    back: "Back",
    submit: "Submit",
    submitting: "Submitting …",
    confirm_close: "Do you really want to close the before submitting?",
    location_more: "Click here to learn more"
  },
  errors: {
    required: "This field is required.",
    boolean: "Please choose one of the options.",
    signature: "Please sign with your finger or your mouse."
  },
  summary: {
    message: "Please confirm your details:",
    edit_item: "Edit from here",
    yes: "Yes",
    no: "No",
    file_uploaded: "File uploaded",
    files_uploaded:
      "%{smart_count} file uploaded |||| %{smart_count} files uploaded",
    signature_given: "Signature given"
  },
  card: {
    data_privacy: "Data Privacy"
  }
};
/* eslint-enable */

const de = {
  form: {
    loading: "Lädt …",
    error: "Beim Laden des Formulars ist ein Fehler aufgetreten …",
    next: "Weiter",
    back: "Zurück",
    submit: "Abschicken",
    submitting: "Wird abgeschickt …",
    confirm_close: "Möchten Sie das Fenster wirklich schließen?",
    location_more: "Hier klicken, um mehr zu erfahren"
  },
  errors: {
    required: "Dieses Feld muss ausgefüllt sein.",
    boolean: "Bitte wählen Sie eine der Optionen aus.",
    signature:
      "Bitte unterschreiben Sie in diesem Feld mit der Maus oder dem Finger."
  },
  summary: {
    message:
      "Bitte überprüfen Sie Ihre Angaben und klicken Sie abschließend auf den Button “Abschicken”",
    edit_item: "Von diesem Schritt aus bearbeiten",
    yes: "Ja",
    no: "Nein",
    file_uploaded: "Datei hochgeladen",
    files_uploaded:
      "%{smart_count} Datei hochgeladen |||| %{smart_count} Dateien hochgeladen",
    signature_given: "Unterschrift geleistet"
  },
  card: {
    data_privacy: "Datenschutz"
  }
};

const da = {
  form: {
    loading: "Indlæser…",
    error: "Det er sket en fejl ved indlæsning af formularen…",
    next: "Næste",
    back: "Tilbage",
    submit: "Send",
    submitting: "Sender…",
    confirm_close: "Er du sikker på, at du vil lukke vinduet? ",
    location_more: "Klik her for mere information "
  },
  errors: {
    required: "Dette felt skal udfyldes",
    boolean: "Vælg venligst en mulighed ",
    signature: "Underskriv venligst i dette felt med musen eller fingeren."
  },
  summary: {
    message:
      "Tjek venligst dine oplysninger og tryk derefter på knappen “send“",
    edit_item: "Rediger",
    yes: "Ja",
    no: "Nej",
    file_uploaded: "Fil uploaded",
    files_uploaded:
      "%{smart_count} Fil uploaded |||| %{smart_count} Filer uploaded",
    signature_given: "Underskrift gennemført"
  },
  card: {
    data_privacy: "Databeskyttelse"
  }
};

const id = {
  form: {
    loading: "loading",
    error: "kesalahan",
    next: "berikutnya",
    back: "kembali",
    submit: "kirim",
    submitting: "mengirimkan",
    confirm_close: "Apakah Anda ingin menutup jendela? ",
    location_more: "Klik di sini untuk membelajari lebih lanjut"
  },
  errors: {
    required: "Kolom ini harus diisi.",
    boolean: "Silakan memilih salah satu pilihan.",
    signature: "Silakan menandatangani kolom ini dengan tangan atau mouse."
  },
  summary: {
    message: "Silakan periksa detail Anda dan terakhir klik tombol “kirim”",
    edit_item: "Edit dari langkah ini",
    yes: "ya",
    no: "tidak",
    file_uploaded: "File diunggah",
    files_uploaded:
      "%{smart_count} file diunggah |||| %{smart_count} file diunggah",
    signature_given: "Tandatangan sudah diberikan"
  },
  card: {
    data_privacy: "pelindungan data pribadi"
  }
};

const it = {
  form: {
    loading: "sta scaricando",
    error: "errore",
    next: "Avanti",
    back: "Indietro",
    submit: "Invia",
    submitting: "Sta inviando",
    confirm_close: "Conferma chiusura scheda",
    location_more: "Clicca qui per sapere di più"
  },
  errors: {
    required: "Obbligatorio.",
    boolean: "Scegliere una delle opzioni.",
    signature: "Firmare qui con il mouse o il trackpad."
  },
  summary: {
    message: "Verifica i tuoi dati e clicca su “invia”",
    edit_item: "Modifica elemento",
    yes: "Si",
    no: "No",
    file_uploaded: "File scaricato",
    files_uploaded:
      "%{smart_count} file scaricato |||| %{smart_count} files scaricati",
    signature_given: "Messo la firma"
  },
  card: {
    data_privacy: "Protezione dei dati"
  }
};

const pt = {
  form: {
    loading: "carregando",
    error: "Ocoreu um erro ao carregar o formulário",
    next: "Avancar",
    back: "Voltar",
    submit: "Enviar",
    submitting: "Enviando",
    confirm_close: "Voce realmente quer fechar essa janela?",
    location_more: "Clicar aqui para saber mais"
  },
  errors: {
    required: "Esse campo precisa ser preenchdo",
    boolean: "Escolhe uma das opcoes.",
    signature: "Assine esse campo com o mouse o o dedo."
  },
  summary: {
    message: "Verifique seus dados e clique em „enviar",
    edit_item: "Editar a partir desse passo",
    yes: "Sim",
    no: "Não",
    file_uploaded: "Arquivo carregado ",
    files_uploaded:
      "%{smart_count} arquivo carregado |||| %{smart_count} arquivo carregado",
    signature_given: "Assinatura realizada"
  },
  card: {
    data_privacy: "Política de privacidade"
  }
};

const ru = {
  form: {
    loading: "Загружается...",
    error: "Произошла ошибка при загрузке анкеты",
    next: "далее",
    back: "назад",
    submit: "отправить",
    submitting: " отправляется…",
    confirm_close: "Вы действительно хотите закрыть окно?",
    location_more: "Нажмите здесь, чтобы узнать больше"
  },
  errors: {
    required: "Это поле необходимо заполнить.",
    boolean: "Пожалуйста, выберите один из вариантов.",
    signature: "Пожалуйста, подпишите здесь с помощью мыши или пальца."
  },
  summary: {
    message: "Пожалуйста, проверьте свои данные и нажмите на кнопку Отправить",
    edit_item: "Начиная с этого шага редактируйте",
    yes: "Да",
    no: "Нет",
    file_uploaded: "Файл загружен",
    files_uploaded:
      "%{smart_count} Файл загружен |||| %{smart_count} Файлы загружены",
    signature_given: "Подпись поставлена"
  },
  card: {
    data_privacy: "Защита данных"
  }
};

const sr = {
  form: {
    loading: "učitava…",
    error: "došlo je do greške pri učitavanju formulara …",
    next: "dalje",
    back: "nazad",
    submit: "pošalji/pošaljite",
    submitting: "biće poslato …",
    confirm_close: "Da li zaista želite da zatvorite prozor?",
    location_more: "Ovde kliknite da saznate više"
  },
  errors: {
    required: "Ovo polje mora da bude popunjeno.",
    boolean: "Izaberite jednu od opcija",
    signature: "Potpišite se u ovom polju ili sa mišom ili sa prstom."
  },
  summary: {
    message: "Proverite svoje podatke, a zatim kliknite na dugme “pošalji“",
    edit_item: "dalja obrada posle ovog koraka",
    yes: "da",
    no: "ne",
    file_uploaded: "Fajl je aplouded",
    files_uploaded:
      "%{smart_count} Fajl je aplouded  |||| %{smart_count} Fajlovi su aplouded",
    signature_given: "potpisano"
  },
  card: {
    data_privacy: "privatnost"
  }
};

const so = {
  form: {
    loading: "Rarista bogga",
    error: "Khalad ayaa ka dhacay soo rarista xogta foomka",
    next: "Ku xiga",
    back: "Dib u noqo",
    submit: "Gudbi / Soo gudbi",
    submitting: "Soo gudbin",
    confirm_close:
      "Runtii ma rabtaa inaad xirto daaqada ka hor inta aadan soo gudbin?",
    location_more: "Riix halkan si aad wax badan uga ogaato"
  },
  errors: {
    required: "Goobtaan waa loo baahan yahay.",
    boolean: "Fadlan door, mid ka mid ah xulashooyinka.",
    signature: "Fadlan ku saxiix fartaada ama isticmaal mawska kombyutar ka."
  },
  summary: {
    message:
      "Fadlan xaqiiji faahfaahintaada oo guji badhanka si aad u gudbiso:",
    edit_item: "Halkan ka tafatir",
    yes: "Haa",
    no: "Maya",
    file_uploaded: "Soo gelinta faylka",
    files_uploaded:
      "%{smart_count} Soo gelinta faylka |||| %{smart_count} Soo gelinka faylaha",
    signature_given: "Saxiix la siiyay"
  },
  card: {
    data_privacy: "Xogta gaarka ah"
  }
};

const es = {
  form: {
    loading: "Cargando …",
    error: "Ha ocurrido un error …",
    next: "Continuar",
    back: "Volver",
    submit: "Enviar",
    submitting: "Enviando ...",
    confirm_close: "¿Está seguro qué quiere salir?",
    location_more: "Pincha aquí para más informaciones"
  },
  errors: {
    required: "Hay que rellenar este campo.",
    boolean: "Pf, elija una opción.",
    signature: "Pf, firme con el dedo o el ratón."
  },
  summary: {
    message: "Pf, revise la información y pinche después en 'Enviar'.",
    edit_item: "Seguir",
    yes: "Sí",
    no: "No",
    file_uploaded: "Cargar fichero",
    files_uploaded:
      "%{smart_count} Cargar fichero |||| %{smart_count} Cargar ficheros",
    signature_given: "Firmar"
  },
  card: {
    data_privacy: "Protección de datos"
  }
};

const tr = {
  form: {
    loading: "yükleniyor …",
    error: "yüklenirken bir hata oluştu …",
    next: "ileri",
    back: "geri",
    submit: "gönder",
    submitting: "gönderilir …",
    confirm_close: "ekrani gercekten kaptmak isiyor musunuz?",
    location_more: "daha fazlasını öğrenmek için tıklayın"
  },
  errors: {
    required: "bu alan doldurulmalıdır.",
    boolean: "seçeneklerden birini seçin.",
    signature: "bu alanda imzalayin lütfen."
  },
  summary: {
    message:
      "lütfen bilgilerinizi kontrol edin, sonra “gönder” düğmesine tıklayın",
    edit_item: "buradan düzenle",
    yes: "evet",
    no: "hayir",
    file_uploaded: "dosya yüklendi",
    files_uploaded:
      "%{smart_count} dosya yüklendi |||| %{smart_count} dosya yüklendi",
    signature_given: "imza verildi"
  },
  card: {
    data_privacy: "veri gizliliği"
  }
};

// add more languages if you need
const translations = {
  de: new Polyglot({ phrases: de, locale: "de" }),
  en: new Polyglot({ phrases: en, locale: "en" }),
  da: new Polyglot({ phrases: da, locale: "da" }),
  id: new Polyglot({ phrases: id, locale: "id" }),
  it: new Polyglot({ phrases: it, locale: "it" }),
  pt: new Polyglot({ phrases: pt, locale: "pt" }),
  ru: new Polyglot({ phrases: ru, locale: "ru" }),
  sr: new Polyglot({ phrases: sr, locale: "sr" }),
  so: new Polyglot({ phrases: so, locale: "en-gb" }),
  es: new Polyglot({ phrases: es, locale: "es" }),
  tr: new Polyglot({ phrases: tr, locale: "tr" })
};

// FIXME
let activeLocale = "de";
const t = (key, ...rest) => translations[activeLocale || "de"].t(key, ...rest);
t.setLocale = (code = "de") => (activeLocale = code);

export { t };
