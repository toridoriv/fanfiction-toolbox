import { createPropertyChecker } from "./common/objects.js";

/**
 * An object representing an undetermined programming language,
 * with default properties for the code, name, native name,
 * and directionality. Used as a fallback value when the language cannot be detected.
 */
const UNDETERMINED_LANGUAGE = {
  code: "xx",
  name: "Undetermined",
  nativeName: "Undetermined",
  direction: "LTR",
};

/**
 * An array of {@link LanguageObject} for different human languages.
 */
const LANGUAGES = Object.freeze([
  {
    code: "aa",
    name: "Afar",
    nativeName: "Afaraf",
    direction: "LTR",
  },
  {
    code: "ab",
    name: "Abkhazian",
    nativeName: "Аҧсуа бызшәа",
    direction: "LTR",
  },
  {
    code: "ae",
    name: "Avestan",
    nativeName: "Avesta",
    direction: "LTR",
  },
  {
    code: "af",
    name: "Afrikaans",
    nativeName: "Afrikaans",
    direction: "LTR",
  },
  {
    code: "ak",
    name: "Akan",
    nativeName: "Akan",
    direction: "LTR",
  },
  {
    code: "am",
    name: "Amharic",
    nativeName: "አማርኛ",
    direction: "LTR",
  },
  {
    code: "an",
    name: "Aragonese",
    nativeName: "Aragonés",
    direction: "LTR",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "اَلْعَرَبِيَّةُ",
    direction: "RTL",
  },
  {
    code: "as",
    name: "Assamese",
    nativeName: "অসমীয়া",
    direction: "LTR",
  },
  {
    code: "av",
    name: "Avaric",
    nativeName: "Авар мацӀ",
    direction: "LTR",
  },
  {
    code: "ay",
    name: "Aymara",
    nativeName: "Aymar aru",
    direction: "LTR",
  },
  {
    code: "az",
    name: "Azerbaijani",
    nativeName: "Azərbaycan dili",
    direction: "LTR",
  },
  {
    code: "ba",
    name: "Bashkir",
    nativeName: "Башҡорт теле",
    direction: "LTR",
  },
  {
    code: "be",
    name: "Belarusian",
    nativeName: "Беларуская мова",
    direction: "LTR",
  },
  {
    code: "bg",
    name: "Bulgarian",
    nativeName: "Български език",
    direction: "LTR",
  },
  {
    code: "bh",
    name: "Bihari languages",
    nativeName: "भोजपुरी",
    direction: "LTR",
  },
  {
    code: "bi",
    name: "Bislama",
    nativeName: "Bislama",
    direction: "LTR",
  },
  {
    code: "bm",
    name: "Bambara",
    nativeName: "Bamanankan",
    direction: "LTR",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    direction: "LTR",
  },
  {
    code: "bo",
    name: "Tibetan",
    nativeName: "བོད་ཡིག",
    direction: "LTR",
  },
  {
    code: "br",
    name: "Breton",
    nativeName: "Brezhoneg",
    direction: "LTR",
  },
  {
    code: "bs",
    name: "Bosnian",
    nativeName: "Bosanski",
    direction: "LTR",
  },
  {
    code: "ca",
    name: "Catalan",
    nativeName: "Català",
    direction: "LTR",
  },
  {
    code: "ce",
    name: "Chechen",
    nativeName: "Нохчийн мотт",
    direction: "LTR",
  },
  {
    code: "ch",
    name: "Chamorro",
    nativeName: "Chamoru",
    direction: "LTR",
  },
  {
    code: "co",
    name: "Corsican",
    nativeName: "Corsu",
    direction: "LTR",
  },
  {
    code: "cr",
    name: "Cree",
    nativeName: "ᓀᐦᐃᔭᐍᐏᐣ",
    direction: "LTR",
  },
  {
    code: "cs",
    name: "Czech",
    nativeName: "Čeština",
    direction: "LTR",
  },
  {
    code: "cu",
    name: "Church Slavic",
    nativeName: "Ѩзыкъ словѣньскъ",
    direction: "LTR",
  },
  {
    code: "cv",
    name: "Chuvash",
    nativeName: "Чӑваш чӗлхи",
    direction: "LTR",
  },
  {
    code: "cy",
    name: "Welsh",
    nativeName: "Cymraeg",
    direction: "LTR",
  },
  {
    code: "da",
    name: "Danish",
    nativeName: "Dansk",
    direction: "LTR",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    direction: "LTR",
  },
  {
    code: "dv",
    name: "Divehi",
    nativeName: "ދިވެހި",
    direction: "RTL",
  },
  {
    code: "dz",
    name: "Dzongkha",
    nativeName: "རྫོང་ཁ",
    direction: "LTR",
  },
  {
    code: "ee",
    name: "Ewe",
    nativeName: "Eʋegbe",
    direction: "LTR",
  },
  {
    code: "el",
    name: "Greek",
    nativeName: "Ελληνικά",
    direction: "LTR",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    direction: "LTR",
  },
  {
    code: "eo",
    name: "Esperanto",
    nativeName: "Esperanto",
    direction: "LTR",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    direction: "LTR",
  },
  {
    code: "et",
    name: "Estonian",
    nativeName: "Eesti",
    direction: "LTR",
  },
  {
    code: "eu",
    name: "Basque",
    nativeName: "Euskara",
    direction: "LTR",
  },
  {
    code: "fa",
    name: "Persian",
    nativeName: "فارسی",
    direction: "RTL",
  },
  {
    code: "ff",
    name: "Fulah",
    nativeName: "Fulfulde",
    direction: "LTR",
  },
  {
    code: "fi",
    name: "Finnish",
    nativeName: "Suomi",
    direction: "LTR",
  },
  {
    code: "fj",
    name: "Fijian",
    nativeName: "Vakaviti",
    direction: "LTR",
  },
  {
    code: "fo",
    name: "Faroese",
    nativeName: "Føroyskt",
    direction: "LTR",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    direction: "LTR",
  },
  {
    code: "fy",
    name: "Western Frisian",
    nativeName: "Frysk",
    direction: "LTR",
  },
  {
    code: "ga",
    name: "Irish",
    nativeName: "Gaeilge",
    direction: "LTR",
  },
  {
    code: "gd",
    name: "Scottish Gaelic",
    nativeName: "Gàidhlig",
    direction: "LTR",
  },
  {
    code: "gl",
    name: "Galician",
    nativeName: "Galego",
    direction: "LTR",
  },
  {
    code: "gn",
    name: "Guaraní",
    nativeName: "Avañe'ẽ",
    direction: "LTR",
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    direction: "LTR",
  },
  {
    code: "gv",
    name: "Manx",
    nativeName: "Gaelg",
    direction: "LTR",
  },
  {
    code: "ha",
    name: "Hausa",
    nativeName: "هَوُسَ",
    direction: "RTL",
  },
  {
    code: "he",
    name: "Hebrew",
    nativeName: "עברית",
    direction: "RTL",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    direction: "LTR",
  },
  {
    code: "ho",
    name: "Hiri Motu",
    nativeName: "Hiri Motu",
    direction: "LTR",
  },
  {
    code: "hr",
    name: "Croatian",
    nativeName: "Hrvatski",
    direction: "LTR",
  },
  {
    code: "ht",
    name: "Haitian Creole",
    nativeName: "Kreyòl ayisyen",
    direction: "LTR",
  },
  {
    code: "hu",
    name: "Hungarian",
    nativeName: "Magyar",
    direction: "LTR",
  },
  {
    code: "hy",
    name: "Armenian",
    nativeName: "Հայերեն",
    direction: "LTR",
  },
  {
    code: "hz",
    name: "Herero",
    nativeName: "Otjiherero",
    direction: "LTR",
  },
  {
    code: "ia",
    name: "Interlingua",
    nativeName: "Interlingua",
    direction: "LTR",
  },
  {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    direction: "LTR",
  },
  {
    code: "ie",
    name: "Interlingue",
    nativeName: "Interlingue",
    direction: "LTR",
  },
  {
    code: "ig",
    name: "Igbo",
    nativeName: "Asụsụ Igbo",
    direction: "LTR",
  },
  {
    code: "ii",
    name: "Sichuan Yi",
    nativeName: "ꆈꌠ꒿ Nuosuhxop",
    direction: "LTR",
  },
  {
    code: "ik",
    name: "Inupiaq",
    nativeName: "Iñupiaq",
    direction: "LTR",
  },
  {
    code: "io",
    name: "Ido",
    nativeName: "Ido",
    direction: "LTR",
  },
  {
    code: "is",
    name: "Icelandic",
    nativeName: "Íslenska",
    direction: "LTR",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    direction: "LTR",
  },
  {
    code: "iu",
    name: "Inuktitut",
    nativeName: "ᐃᓄᒃᑎᑐᑦ",
    direction: "LTR",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    direction: "LTR",
  },
  {
    code: "jv",
    name: "Javanese",
    nativeName: "Basa Jawa",
    direction: "LTR",
  },
  {
    code: "ka",
    name: "Georgian",
    nativeName: "Ქართული",
    direction: "LTR",
  },
  {
    code: "kg",
    name: "Kongo",
    nativeName: "Kikongo",
    direction: "LTR",
  },
  {
    code: "ki",
    name: "Kikuyu",
    nativeName: "Gĩkũyũ",
    direction: "LTR",
  },
  {
    code: "kj",
    name: "Kuanyama",
    nativeName: "Kuanyama",
    direction: "LTR",
  },
  {
    code: "kk",
    name: "Kazakh",
    nativeName: "Қазақ тілі",
    direction: "LTR",
  },
  {
    code: "kl",
    name: "Kalaallisut",
    nativeName: "Kalaallisut",
    direction: "LTR",
  },
  {
    code: "km",
    name: "Central Khmer",
    nativeName: "ខេមរភាសា",
    direction: "LTR",
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    direction: "LTR",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    direction: "LTR",
  },
  {
    code: "kr",
    name: "Kanuri",
    nativeName: "Kanuri",
    direction: "LTR",
  },
  {
    code: "ks",
    name: "Kashmiri",
    nativeName: "कश्मीरी",
    direction: "RTL",
  },
  {
    code: "ku",
    name: "Kurdish",
    nativeName: "Kurdî",
    direction: "RTL",
  },
  {
    code: "kv",
    name: "Komi",
    nativeName: "Коми кыв",
    direction: "LTR",
  },
  {
    code: "kw",
    name: "Cornish",
    nativeName: "Kernewek",
    direction: "LTR",
  },
  {
    code: "ky",
    name: "Kirghiz",
    nativeName: "Кыргызча",
    direction: "LTR",
  },
  {
    code: "la",
    name: "Latin",
    nativeName: "Latine",
    direction: "LTR",
  },
  {
    code: "lb",
    name: "Luxembourgish",
    nativeName: "Lëtzebuergesch",
    direction: "LTR",
  },
  {
    code: "lg",
    name: "Ganda",
    nativeName: "Luganda",
    direction: "LTR",
  },
  {
    code: "li",
    name: "Limburgish",
    nativeName: "Limburgs",
    direction: "LTR",
  },
  {
    code: "ln",
    name: "Lingala",
    nativeName: "Lingála",
    direction: "LTR",
  },
  {
    code: "lo",
    name: "Lao",
    nativeName: "ພາສາລາວ",
    direction: "LTR",
  },
  {
    code: "lt",
    name: "Lithuanian",
    nativeName: "Lietuvių kalba",
    direction: "LTR",
  },
  {
    code: "lu",
    name: "Luba-Katanga",
    nativeName: "Kiluba",
    direction: "LTR",
  },
  {
    code: "lv",
    name: "Latvian",
    nativeName: "Latviešu valoda",
    direction: "LTR",
  },
  {
    code: "mg",
    name: "Malagasy",
    nativeName: "Fiteny malagasy",
    direction: "LTR",
  },
  {
    code: "mh",
    name: "Marshallese",
    nativeName: "Kajin M̧ajeļ",
    direction: "LTR",
  },
  {
    code: "mi",
    name: "Maori",
    nativeName: "Te reo Māori",
    direction: "LTR",
  },
  {
    code: "mk",
    name: "Macedonian",
    nativeName: "Македонски",
    direction: "LTR",
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    direction: "LTR",
  },
  {
    code: "mn",
    name: "Mongolian",
    nativeName: "Монгол хэл",
    direction: "LTR",
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    direction: "LTR",
  },
  {
    code: "ms",
    name: "Malay",
    nativeName: "Bahasa Melayu",
    direction: "LTR",
  },
  {
    code: "mt",
    name: "Maltese",
    nativeName: "Malti",
    direction: "LTR",
  },
  {
    code: "my",
    name: "Burmese",
    nativeName: "ဗမာစာ",
    direction: "LTR",
  },
  {
    code: "na",
    name: "Nauru",
    nativeName: "Dorerin Naoero",
    direction: "LTR",
  },
  {
    code: "nb",
    name: "Norwegian Bokmål",
    nativeName: "Norsk bokmål",
    direction: "LTR",
  },
  {
    code: "nd",
    name: "North Ndebele",
    nativeName: "IsiNdebele",
    direction: "LTR",
  },
  {
    code: "ne",
    name: "Nepali",
    nativeName: "नेपाली",
    direction: "LTR",
  },
  {
    code: "ng",
    name: "Ndonga",
    nativeName: "Owambo",
    direction: "LTR",
  },
  {
    code: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
    direction: "LTR",
  },
  {
    code: "nn",
    name: "Norwegian Nynorsk",
    nativeName: "Norsk nynorsk",
    direction: "LTR",
  },
  {
    code: "no",
    name: "Norwegian",
    nativeName: "Norsk",
    direction: "LTR",
  },
  {
    code: "nr",
    name: "South Ndebele",
    nativeName: "IsiNdebele",
    direction: "LTR",
  },
  {
    code: "nv",
    name: "Navajo",
    nativeName: "Diné bizaad",
    direction: "LTR",
  },
  {
    code: "ny",
    name: "Chichewa",
    nativeName: "ChiCheŵa",
    direction: "LTR",
  },
  {
    code: "oc",
    name: "Occitan",
    nativeName: "Occitan",
    direction: "LTR",
  },
  {
    code: "oj",
    name: "Ojibwe",
    nativeName: "ᐊᓂᔑᓈᐯᒧᐎᓐ",
    direction: "LTR",
  },
  {
    code: "om",
    name: "Oromo",
    nativeName: "Afaan Oromoo",
    direction: "LTR",
  },
  {
    code: "or",
    name: "Oriya",
    nativeName: "ଓଡ଼ିଆ",
    direction: "LTR",
  },
  {
    code: "os",
    name: "Ossetian",
    nativeName: "Ирон æвзаг",
    direction: "LTR",
  },
  {
    code: "pa",
    name: "Panjabi",
    nativeName: "ਪੰਜਾਬੀ",
    direction: "LTR",
  },
  {
    code: "pi",
    name: "Pali",
    nativeName: "पाऴि",
    direction: "LTR",
  },
  {
    code: "pl",
    name: "Polish",
    nativeName: "Polski",
    direction: "LTR",
  },
  {
    code: "ps",
    name: "Pushto",
    nativeName: "پښتو",
    direction: "RTL",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    direction: "LTR",
  },
  {
    code: "qu",
    name: "Quechua",
    nativeName: "Runa Simi",
    direction: "LTR",
  },
  {
    code: "rm",
    name: "Romansh",
    nativeName: "Rumantsch grischun",
    direction: "LTR",
  },
  {
    code: "rn",
    name: "Rundi",
    nativeName: "Ikirundi",
    direction: "LTR",
  },
  {
    code: "ro",
    name: "Romanian",
    nativeName: "Română",
    direction: "LTR",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    direction: "LTR",
  },
  {
    code: "rw",
    name: "Kinyarwanda",
    nativeName: "Ikinyarwanda",
    direction: "LTR",
  },
  {
    code: "sa",
    name: "Sanskrit",
    nativeName: "संस्कृतम्",
    direction: "LTR",
  },
  {
    code: "sc",
    name: "Sardinian",
    nativeName: "Sardu",
    direction: "LTR",
  },
  {
    code: "sd",
    name: "Sindhi",
    nativeName: "सिन्धी",
    direction: "RTL",
  },
  {
    code: "se",
    name: "Northern Sami",
    nativeName: "Davvisámegiella",
    direction: "LTR",
  },
  {
    code: "sg",
    name: "Sango",
    nativeName: "Yângâ tî sängö",
    direction: "LTR",
  },
  {
    code: "si",
    name: "Sinhalese",
    nativeName: "සිංහල",
    direction: "LTR",
  },
  {
    code: "sk",
    name: "Slovak",
    nativeName: "Slovenčina",
    direction: "LTR",
  },
  {
    code: "sl",
    name: "Slovenian",
    nativeName: "Slovenščina",
    direction: "LTR",
  },
  {
    code: "sm",
    name: "Samoan",
    nativeName: "Gagana fa'a Sāmoa",
    direction: "LTR",
  },
  {
    code: "sn",
    name: "Shona",
    nativeName: "ChiShona",
    direction: "LTR",
  },
  {
    code: "so",
    name: "Somali",
    nativeName: "Soomaaliga",
    direction: "LTR",
  },
  {
    code: "sq",
    name: "Albanian",
    nativeName: "Shqip",
    direction: "LTR",
  },
  {
    code: "sr",
    name: "Serbian",
    nativeName: "Српски",
    direction: "LTR",
  },
  {
    code: "ss",
    name: "Swati",
    nativeName: "SiSwati",
    direction: "LTR",
  },
  {
    code: "st",
    name: "Sotho, Southern",
    nativeName: "Sesotho",
    direction: "LTR",
  },
  {
    code: "su",
    name: "Sundanese",
    nativeName: "Basa Sunda",
    direction: "LTR",
  },
  {
    code: "sv",
    name: "Swedish",
    nativeName: "Svenska",
    direction: "LTR",
  },
  {
    code: "sw",
    name: "Swahili",
    nativeName: "Kiswahili",
    direction: "LTR",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    direction: "LTR",
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    direction: "LTR",
  },
  {
    code: "tg",
    name: "Tajik",
    nativeName: "Тоҷикӣ",
    direction: "LTR",
  },
  {
    code: "th",
    name: "Thai",
    nativeName: "ไทย",
    direction: "LTR",
  },
  {
    code: "ti",
    name: "Tigrinya",
    nativeName: "ትግርኛ",
    direction: "LTR",
  },
  {
    code: "tk",
    name: "Turkmen",
    nativeName: "Türkmençe",
    direction: "LTR",
  },
  {
    code: "tl",
    name: "Tagalog",
    nativeName: "Wikang Tagalog",
    direction: "LTR",
  },
  {
    code: "tn",
    name: "Tswana",
    nativeName: "Setswana",
    direction: "LTR",
  },
  {
    code: "to",
    name: "Tonga",
    nativeName: "Faka Tonga",
    direction: "LTR",
  },
  {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    direction: "LTR",
  },
  {
    code: "ts",
    name: "Tsonga",
    nativeName: "Xitsonga",
    direction: "LTR",
  },
  {
    code: "tt",
    name: "Tatar",
    nativeName: "Татар теле",
    direction: "LTR",
  },
  {
    code: "tw",
    name: "Twi",
    nativeName: "Twi",
    direction: "LTR",
  },
  {
    code: "ty",
    name: "Tahitian",
    nativeName: "Reo Tahiti",
    direction: "LTR",
  },
  {
    code: "ug",
    name: "Uighur",
    nativeName: "Уйғур тили",
    direction: "LTR",
  },
  {
    code: "uk",
    name: "Ukrainian",
    nativeName: "Українська",
    direction: "LTR",
  },
  {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    direction: "RTL",
  },
  {
    code: "uz",
    name: "Uzbek",
    nativeName: "Ўзбек",
    direction: "LTR",
  },
  {
    code: "ve",
    name: "Venda",
    nativeName: "Tshivenḓa",
    direction: "LTR",
  },
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    direction: "LTR",
  },
  {
    code: "vo",
    name: "Volapük",
    nativeName: "Volapük",
    direction: "LTR",
  },
  {
    code: "wa",
    name: "Walloon",
    nativeName: "Walon",
    direction: "LTR",
  },
  {
    code: "wo",
    name: "Wolof",
    nativeName: "Wollof",
    direction: "LTR",
  },
  {
    code: "xh",
    name: "Xhosa",
    nativeName: "IsiXhosa",
    direction: "LTR",
  },
  {
    code: "yi",
    name: "Yiddish",
    nativeName: "ייִדיש",
    direction: "RTL",
  },
  {
    code: "yo",
    name: "Yoruba",
    nativeName: "Yorùbá",
    direction: "LTR",
  },
  {
    code: "za",
    name: "Zhuang",
    nativeName: "Saɯ cueŋƅ",
    direction: "LTR",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    direction: "LTR",
  },
  {
    code: "zu",
    name: "Zulu",
    nativeName: "IsiZulu",
    direction: "LTR",
  },
]);

/**
 * Defines the shape of a language object.
 *
 * @typedef
 * @property {string} code       ISO 639-1 language code.
 * @property {string} name       Full English name of the language.
 * @property {string} nativeName Name of the language in its native tongue.
 * @property {string} direction  Text direction, 'LTR' or 'RTL'
 */
var LanguageObject;

const hasCodeSetTo = createPropertyChecker("code");
const hasNameSetTo = createPropertyChecker("name");

/**
 * @param {string} code
 * @returns {LanguageObject}
 */
function findByCode(code) {
  const found = LANGUAGES.find(hasCodeSetTo(code));

  if (!found) {
    return UNDETERMINED_LANGUAGE;
  }

  return found;
}

/**
 * @param {string} name
 * @returns {LanguageObject}
 */
function findByName(name) {
  const found = LANGUAGES.find(hasNameSetTo(name));

  if (!found) {
    return UNDETERMINED_LANGUAGE;
  }

  return found;
}

export { findByCode, findByName, LanguageObject, LANGUAGES };
