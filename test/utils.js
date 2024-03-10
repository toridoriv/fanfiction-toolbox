export { fakerEN_US, fakerES_MX, fakerRU } from "@faker-js/faker";
import {
  en,
  Faker,
  fakerEN,
  fakerES,
  fakerFR,
  fakerKO,
  fakerPT_BR,
  fakerRU,
  fakerZH_CN,
  it,
  ja,
} from "@faker-js/faker";

import { findByCode } from "../lib/localization/languages.js";

const LanguageRandomizers = [
  {
    language: findByCode("en"),
    faker: fakerEN,
    sentences: [
      "In every generation there is a chosen one. She alone will stand against the vampires, the demons, and the forces of darkness. She is the Slayer.",
      "The first rule of Fight Club is: You do not talk about Fight Club. The second rule of Fight Club is: YOU DO NOT. TALK. ABOUT FIGHT CLUB!",
    ],
  },
  {
    language: findByCode("es"),
    faker: fakerES,
    sentences: [
      "En cada generación nace una elegida. Ella sola se enfrentará a los vampiros, los demonios y las fuerzas de la oscuridad. Ella es la cazavampiros",
      "La primera regla del Club de la Pelea es no hablar del Club de la Pelea. La segunda regla del Club de la Pelea es NO hablar del Club de la Pelea.",
    ],
  },
  {
    language: findByCode("fr"),
    faker: fakerFR,
    sentences: [
      "À chaque génération, il y a une Élue. Seule, elle devra affronter les vampires, les démons et les forces de l'ombre. Elle s'appelle Buffy.",
      "La première règle du Fight Club est : il est interdit de parler du Fight Club. La deuxième règle du Fight Club est : il est interdit de parler du Fight Club.",
    ],
  },
  {
    language: findByCode("ja"),
    faker: new Faker({
      locale: [
        {
          ...ja,
          color: {
            human: Object.values({
              /**
               * Reading: `くろ`.
               */
              black: "黒",
              /**
               * Reading: `きんいろ`.
               */
              gold: "金色",
              /**
               * Reading: `あか`.
               */
              red: "赤",
              /**
               * Reading: `だいだいいろ`.
               */
              orange: "橙色",
              /**
               * Reading: `きいろ`.
               */
              yellow: "黄色",
              /**
               * Reading: `みどり`.
               */
              green: "緑",
              /**
               * Reading: `むらさき`.
               */
              purple: "紫",
            }),
          },
        },
        en,
      ],
    }),
    sentences: [
      "すべての世代に選ばれた者がいます。彼女だけが吸血鬼、悪魔、そして闇の勢力に立ち向かうでしょう。彼女はスレイヤーです。",
      "ファイトクラブ ルールその１ ファイトクラブについて話すな。ファイトクラブ ルールその２ ファイトクラブについて話すな。",
    ],
  },
  {
    language: findByCode("it"),
    faker: new Faker({
      locale: [
        {
          ...it,
          color: {
            human: [
              "nero",
              "nera",
              "marrone",
              "grigio",
              "grigia",
              "bianco",
              "bianca",
              "giallo",
              "gialla",
              "arancione",
              "rosso",
              "rossa",
              "rosa",
              "viola",
              "blu",
              "azzurro",
              "azzurra",
              "verde",
            ],
          },
        },
        en,
      ],
    }),
    sentences: [
      "Per ogni generazione c'è una prescelta che si erge contro i vampiri, i demoni, e le forze del male. Lei è la cacciatrice.",
      "Prima regola del Fight Club: non parlate mai del Fight Club. Seconda regola del Fight Club: non dovete parlare mai del Fight Club.",
    ],
  },
  {
    language: findByCode("ko"),
    faker: fakerKO,
    sentences: [
      "모든 세대에는 선택받은 이가 있다. 그녀는 홀로 뱀파이어와 악마 그리고 어둠의 세력에 맞설 것이다. 그녀는 슬레이어다.",
      "제1조: 파이트 클럽에 대해 말하지 않는다. 제2조: 파이트 클럽에 대해 말하지 않는다.",
    ],
  },
  {
    language: findByCode("pt"),
    faker: fakerPT_BR,
    sentences: [
      "A cada geração nasce uma caçadora. Sozinha ela irá lutar contra os vampiros, os demônios e as forças da escuridão. Ela é a caça-vampiros.",
      "A primeira regra do Clube da Luta é: você não fala sobre o Clube da Luta. A segunda regra do Clube da Luta é: você NÃO fala sobre o Clube da Luta.",
    ],
  },
  {
    language: findByCode("ru"),
    faker: fakerRU,
    sentences: [
      "В каждом поколении есть Избранная. Она одна будет бороться с демонами, вампирами и тёмными силами. Она — истребительница вампиров!",
      "Первое правило Бойцовского клуба: не упоминать о Бойцовском клубе. Второе правило Бойцовского клуба: не упоминать нигде о Бойцовском клубе.",
    ],
  },
  {
    language: findByCode("zh"),
    faker: fakerZH_CN,
    sentences: [
      "每一代都有一个被选中的人……她将独自对抗吸血鬼、恶魔和黑暗势力。她是杀手。",
      "搏击俱乐部第一条规矩是：你不能谈及搏击俱乐部。第二条规则是：你还是不能谈及搏击俱乐部。",
    ],
  },
];

export { LanguageRandomizers };
