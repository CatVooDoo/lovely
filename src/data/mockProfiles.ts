export interface PsychologyProfile {
  humor: number; // 0 - 100
  leisure: number; // 0 - 100
  values: number; // 0 - 100
  temperament: string;
  loveLanguage: string;
  mbti: string;
  summary: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  distanceKm: number;
  matchPercent: number;
  verified: boolean;
  online: boolean;
  telegramUsername: string;
  bio: string;
  zodiac: string;
  work: string;
  education: string;
  photos: string[];
  tags: { label: string }[];
  psychology: PsychologyProfile;
  icebreakerQuestions: string[];
}

export interface UserProfile {
  name: string;
  age: number;
  city: string;
  avatar: string;
  bio: string;
  matchScore: number;
  temperament: string;
  interests: string[];
  psychology: {
    humor: number;
    leisure: number;
    values: number;
  };
}

export const TARGET_TELEGRAM_USERNAME = "klvnmrt";

export const CURRENT_USER: UserProfile = {
  name: "Алексей",
  age: 25,
  city: "Москва",
  avatar: "/photos/alex_user.jpg",
  bio: "Создаю продукты в IT, люблю ночной город, винил и спонтанные поездки за кофе в полночь.",
  matchScore: 94,
  temperament: "Амбиверт • Архитектор (INTJ)",
  interests: ["IT и Стартапы", "Кофе", "Путешествия", "Винил", "Кино", "Сноуборд"],
  psychology: {
    humor: 92,
    leisure: 88,
    values: 95
  }
};

export const MOCK_PROFILES: Profile[] = [
  {
    id: "p1",
    name: "София",
    age: 23,
    city: "Москва",
    distanceKm: 2,
    matchPercent: 96,
    verified: true,
    online: true,
    telegramUsername: "klvnmrt",
    bio: "Архитектор пространства и мыслей. Люблю современное искусство, утренний фильтр-кофе и искренние разговоры под джаз.",
    zodiac: "Весы",
    work: "Архитектор в студии дизайна",
    education: "МАРХИ",
    photos: [
      "/photos/sofia_1.jpg",
      "/photos/sofia_2.jpg",
      "/photos/sofia_3.jpg"
    ],
    tags: [
      { label: "Искусство" },
      { label: "Путешествия" },
      { label: "Кофе" },
      { label: "Архитектура" },
      { label: "Джаз" }
    ],
    psychology: {
      humor: 96,
      leisure: 92,
      values: 98,
      temperament: "Интуитивный эмпат",
      loveLanguage: "Качественное время и глубокие беседы",
      mbti: "ENFP",
      summary: "Идеальное совпадение по взглядам на жизнь и саморазвитие. Вы оба цените эстетику, независимость и взаимную поддержку."
    },
    icebreakerQuestions: [
      "Какое твое самое безумное спонтанное путешествие?",
      "Идеальное воскресенье: выставка в галерее или фильмы под пледом?",
      "Если бы мы прямо сейчас пошли гулять, какой трек играл бы в наушниках?"
    ]
  },
  {
    id: "p2",
    name: "Алиса",
    age: 24,
    city: "Москва",
    distanceKm: 4,
    matchPercent: 93,
    verified: true,
    online: false,
    telegramUsername: "klvnmrt",
    bio: "Product Designer. Фотографирую на пленочный Olympus, бегаю полумарафоны и ценю людей с тонким чувством юмора.",
    zodiac: "Близнецы",
    work: "Senior UI/UX Designer в Fintech",
    education: "ВШЭ (Дизайн)",
    photos: [
      "/photos/alisa_1.jpg",
      "/photos/alisa_2.jpg",
      "/photos/alisa_3.jpg"
    ],
    tags: [
      { label: "UI/UX" },
      { label: "Бег и Спорт" },
      { label: "Пленка 35mm" },
      { label: "Электронная музыка" }
    ],
    psychology: {
      humor: 94,
      leisure: 89,
      values: 92,
      temperament: "Амбиверт • Креатор",
      loveLanguage: "Слова поддержки и совместные приключения",
      mbti: "ENTP",
      summary: "Общий культурный код и динамичный темп жизни. В диалоге вам легко и интересно."
    },
    icebreakerQuestions: [
      "Музыкальный фестиваль до утра или ламповый акустический концерт?",
      "Какая тема или книга сейчас занимает твои мысли больше всего?",
      "Самая необычная покупка за последний месяц?"
    ]
  },
  {
    id: "p3",
    name: "Екатерина",
    age: 22,
    city: "Москва",
    distanceKm: 5,
    matchPercent: 91,
    verified: true,
    online: true,
    telegramUsername: "klvnmrt",
    bio: "Психолог и исследователь. Могу разобрать теорию привязанности за 10 минут, но обещаю оставить анализ за рамками свидания.",
    zodiac: "Водолей",
    work: "Практикующий психолог, лектор",
    education: "МГУ им. Ломоносова",
    photos: [
      "/photos/ekat_1.jpg",
      "/photos/ekat_2.jpg",
      "/photos/ekat_3.jpg"
    ],
    tags: [
      { label: "Психология" },
      { label: "Книги" },
      { label: "Философия" },
      { label: "Матча и Чай" }
    ],
    psychology: {
      humor: 88,
      leisure: 93,
      values: 96,
      temperament: "Глубокий мыслитель",
      loveLanguage: "Искренность и эмоциональный контакт",
      mbti: "INFJ",
      summary: "Высокая эмоциональная зрелость. Совпадение 96% по фундаментальным жизненным ориентирам."
    },
    icebreakerQuestions: [
      "Какая книга или фильм сильнее всего повлияли на твои взгляды?",
      "Что важнее в общении: абсолютная прямота или деликатность?",
      "Твой любимый способ перезагрузиться после насыщенной недели?"
    ]
  },
  {
    id: "p4",
    name: "Полина",
    age: 25,
    city: "Москва",
    distanceKm: 3,
    matchPercent: 95,
    verified: false,
    online: true,
    telegramUsername: "klvnmrt",
    bio: "Шеф-кондитер пекарни. Обожаю аромат свежей выпечки, французский шансон и открытых людей с легким взглядом на мир.",
    zodiac: "Телец",
    work: "Основательница кондитерской Maison",
    education: "Le Cordon Bleu Paris",
    photos: [
      "/photos/polina_1.jpg",
      "/photos/polina_2.jpg",
      "/photos/polina_3.jpg"
    ],
    tags: [
      { label: "Гастрономия" },
      { label: "Франция" },
      { label: "Интерьеры" },
      { label: "Вино" }
    ],
    psychology: {
      humor: 95,
      leisure: 94,
      values: 91,
      temperament: "Гедонист • Экстраверт",
      loveLanguage: "Забота и кулинарные открытия",
      mbti: "ESFP",
      summary: "Гармония в быту и совпадение в стиле отдыха. Любит создавать тепло и комфорт вокруг себя."
    },
    icebreakerQuestions: [
      "Круассан с миндалем или соленый авокадо-тост на завтрак?",
      "Самое запоминающееся блюдо, которое тебе доводилось пробовать?",
      "Если бы можно было телепортироваться на ужин в любой город мира — куда?"
    ]
  },
  {
    id: "p5",
    name: "Дарья",
    age: 26,
    city: "Москва",
    distanceKm: 7,
    matchPercent: 89,
    verified: true,
    online: false,
    telegramUsername: "klvnmrt",
    bio: "Инструктор по серфингу летом и сноуборду зимой. Покоряю волны, горные склоны и новые рубежи в маркетинге.",
    zodiac: "Стрелец",
    work: "Brand Director в Экстрим-бренде",
    education: "РУДН (Международный маркетинг)",
    photos: [
      "/photos/daria_1.jpg",
      "/photos/daria_2.jpg",
      "/photos/daria_3.jpg"
    ],
    tags: [
      { label: "Сноуборд" },
      { label: "Серфинг" },
      { label: "Маркетинг" },
      { label: "Горы" }
    ],
    psychology: {
      humor: 91,
      leisure: 98,
      values: 87,
      temperament: "Авантюрист • Экстраверт",
      loveLanguage: "Совместный адреналин и спорт",
      mbti: "ESTP",
      summary: "Максимальное совпадение по активному отдыху. Заряжает энергией и мотивирует на движение."
    },
    icebreakerQuestions: [
      "Сноуборд или горные лыжи?",
      "Палатка на вершине горы или спа-отель у моря?",
      "Самый смелый поступок за последний год?"
    ]
  },
  {
    id: "p6",
    name: "Виктория",
    age: 23,
    city: "Москва",
    distanceKm: 1,
    matchPercent: 94,
    verified: true,
    online: true,
    telegramUsername: "klvnmrt",
    bio: "Пишу саундтреки для независимых игр, изучаю модульный синтез. Люблю ночные прогулки и наблюдать за звездным небом.",
    zodiac: "Рыбы",
    work: "Sound Designer и Композитор",
    education: "Академия им. Гнесиных",
    photos: [
      "/photos/viktoria_1.jpg",
      "/photos/viktoria_2.jpg",
      "/photos/viktoria_3.jpg"
    ],
    tags: [
      { label: "Музыка" },
      { label: "Геймдев" },
      { label: "Синтезаторы" },
      { label: "Астрономия" }
    ],
    psychology: {
      humor: 93,
      leisure: 91,
      values: 94,
      temperament: "Мечтатель • Художник",
      loveLanguage: "Музыкальные подборки и тишина вдвоем",
      mbti: "INFP",
      summary: "Тонкая душевная организация и гармония. Вы дополняете друг друга в творческом и эмоциональном плане."
    },
    icebreakerQuestions: [
      "Какой саундтрек из кино или игр вызывает у тебя мурашки?",
      "Космос или океан: что завораживает сильнее?",
      "Если бы мы создавали совместную инди-игру, про что бы она была?"
    ]
  }
];

export interface WhoLikedMeItem {
  id: string;
  name: string;
  age: number;
  matchPercent: number;
  photo: string;
  timeAgo: string;
  superlike: boolean;
}

export const MOCK_LIKED_BY_USERS: WhoLikedMeItem[] = [
  {
    id: "l1",
    name: "Александра",
    age: 22,
    matchPercent: 97,
    photo: "/photos/sofia_2.jpg",
    timeAgo: "5 мин назад",
    superlike: true
  },
  {
    id: "l2",
    name: "Милана",
    age: 24,
    matchPercent: 91,
    photo: "/photos/alisa_2.jpg",
    timeAgo: "22 мин назад",
    superlike: false
  },
  {
    id: "l3",
    name: "Вероника",
    age: 25,
    matchPercent: 94,
    photo: "/photos/ekat_2.jpg",
    timeAgo: "2 ч назад",
    superlike: false
  },
  {
    id: "l4",
    name: "Кристина",
    age: 23,
    matchPercent: 88,
    photo: "/photos/polina_2.jpg",
    timeAgo: "4 ч назад",
    superlike: true
  },
  {
    id: "l5",
    name: "Диана",
    age: 26,
    matchPercent: 93,
    photo: "/photos/daria_2.jpg",
    timeAgo: "Вчера",
    superlike: false
  },
  {
    id: "l6",
    name: "Мария",
    age: 21,
    matchPercent: 95,
    photo: "/photos/viktoria_2.jpg",
    timeAgo: "2 дня назад",
    superlike: false
  }
];

export interface CompatibilityQuestionCard {
  id: number;
  category: string;
  question: string;
  optionA: string;
  optionB: string;
  insight: string;
}

export const COMPATIBILITY_CARDS: CompatibilityQuestionCard[] = [
  {
    id: 1,
    category: "Стиль жизни",
    question: "Как выглядит твой идеальный вечер пятницы?",
    optionA: "Шумная компания друзей до рассвета",
    optionB: "Уютный ужин дома с фильмом и вином",
    insight: "Показывает уровень экстраверсии и потребности в социализации."
  },
  {
    id: 2,
    category: "Отношения",
    question: "Что для тебя важнее в споре с близким человеком?",
    optionA: "Добраться до истины и справедливости",
    optionB: "Сохранить душевное тепло и комфорт",
    insight: "Определяет тип эмоционального реагирования в конфликтах."
  },
  {
    id: 3,
    category: "Путешествия",
    question: "Как ты предпочитаешь путешествовать?",
    optionA: "Спонтанный маршрут без четкого плана",
    optionB: "Продуманный таймлайн и бронь проверенных мест",
    insight: "Маркер гибкости мышления и терпимости к неопределенности."
  },
  {
    id: 4,
    category: "Эмоции",
    question: "Твой главный язык любви и заботы?",
    optionA: "Прикосновения и совместное время",
    optionB: "Поступки, поддержка и внимание к деталям",
    insight: "Ключевой фактор долгосрочной гармонии пары."
  }
];
