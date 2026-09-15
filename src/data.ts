import { Testimonial, QuizQuestion, PreviewCard } from './types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Ana Paula Mendes",
    role: "Mãe do Leonardo (6 anos, autista nível 1)",
    avatarColor: "bg-teal-500",
    text: "O Léo tinha muita resistência com cadernos comuns. O método visual com cores e associação de animais mudou tudo. Ele já consegue ler palavras simples sozinho e pede para fazer as atividades todo dia!",
    rating: 5
  },
  {
    id: "2",
    name: "Dr. Roberto Silva",
    role: "Psicopedagogo e Especialista em Neurodesenvolvimento",
    avatarColor: "bg-indigo-500",
    text: "Recomendo este material para os pais de meus pacientes. Ele respeita a sobrecarga sensorial, usa fontes legíveis e foca na associação direta imagem-fonema, que é cientificamente o melhor caminho para crianças no espectro.",
    rating: 5
  },
  {
    id: "3",
    name: "Mariana Costa",
    role: "Mãe do Thiago (8 anos, autista nível 2)",
    avatarColor: "bg-pink-500",
    text: "Amei o guia para os pais. Ele nos ensina como dar o reforço positivo sem cansar a criança. O progresso do Cacá na coordenação motora para cobrir as letras foi impressionante em apenas 3 semanas.",
    rating: 5
  },
  {
    id: "4",
    name: "Karina Alencar",
    role: "Pedagoga e Professora de Atendimento Educacional Especializado (AEE)",
    avatarColor: "bg-amber-500",
    text: "Este material devia estar em todas as salas de recursos. É limpo, focado, sem poluição visual que distrai o aluno TEA. Os flashcards são maravilhosos para pareamento!",
    rating: 5
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Como está o reconhecimento de letras do seu filho atualmente?",
    options: [
      { text: "Não reconhece nenhuma letra ainda", score: "starter" },
      { text: "Reconhece o próprio nome e algumas letras soltas", score: "basic" },
      { text: "Identifica a maioria das letras e sabe alguns sons", score: "intermediate" }
    ]
  },
  {
    id: 2,
    question: "Como o seu filho reage quando você propõe atividades de escrita/desenho?",
    options: [
      { text: "Fica frustrado rapidamente ou rejeita o papel", score: "starter" },
      { text: "Aceita brincar de riscar ou pintar, mas com apoio visual", score: "basic" },
      { text: "Consegue cobrir pontilhados ou escrever algumas letras com autonomia", score: "intermediate" }
    ]
  },
  {
    id: 3,
    question: "Qual recurso prende mais a atenção do seu filho durante o dia a dia?",
    options: [
      { text: "Imagens coloridas de animais, veículos ou personagens específicos", score: "starter" },
      { text: "Estímulos sonoros, músicas e repetição de palavras ilustradas", score: "basic" },
      { text: "Jogos interativos de encaixar peças, puzzles e pareamento", score: "intermediate" }
    ]
  },
  {
    id: 4,
    question: "Qual o seu maior objetivo na alfabetização dele neste momento?",
    options: [
      { text: "Dar os primeiros passos de forma leve e sem choro", score: "starter" },
      { text: "Associar o som das letras às imagens (consciência fonológica)", score: "basic" },
      { text: "Avançar para a formação de sílabas e leitura de palavras inteiras", score: "intermediate" }
    ]
  }
];

export const PREVIEW_CARDS: PreviewCard[] = [
  {
    letter: "A",
    word: "ABELHA",
    meaning: "A-be-lha",
    imageEmoji: "🐝",
    color: "kid-card-orange text-brand-orange",
    syllables: ["A", "BE", "LHA"]
  },
  {
    letter: "B",
    word: "BOLA",
    meaning: "Bo-la",
    imageEmoji: "⚽",
    color: "kid-card-blue text-brand-blue-med",
    syllables: ["BO", "LA"]
  },
  {
    letter: "C",
    word: "CASA",
    meaning: "Ca-sa",
    imageEmoji: "🏠",
    color: "kid-card-green text-brand-green",
    syllables: ["CA", "SA"]
  },
  {
    letter: "D",
    word: "DOCE",
    meaning: "Do-ce",
    imageEmoji: "🍬",
    color: "kid-card-pink text-brand-purple",
    syllables: ["DO", "CE"]
  },
  {
    letter: "G",
    word: "GATO",
    meaning: "Ga-to",
    imageEmoji: "🐱",
    color: "kid-card-red text-brand-coral",
    syllables: ["GA", "TO"]
  },
  {
    letter: "M",
    word: "MACACO",
    meaning: "Ma-ca-co",
    imageEmoji: "🐒",
    color: "kid-card-orange text-brand-orange",
    syllables: ["MA", "CA", "CO"]
  },
  {
    letter: "P",
    word: "PATO",
    meaning: "Pa-to",
    imageEmoji: "🦆",
    color: "kid-card-blue text-brand-blue-med",
    syllables: ["PA", "TO"]
  },
  {
    letter: "S",
    word: "SAPO",
    meaning: "Sa-po",
    imageEmoji: "🐸",
    color: "kid-card-green text-brand-green",
    syllables: ["SA", "PO"]
  }
];

export const FAQS = [
  {
    question: "O material é digital ou impresso?",
    answer: "O material é 100% digital em formato PDF de excelente qualidade. Você recebe o acesso imediatamente no seu e-mail para baixar e imprimir quantas vezes desejar! Assim, se seu filho rasgar ou rabiscar, você pode reimprimir apenas a folha necessária sem custos extras."
  },
  {
    question: "Para qual idade o método é indicado?",
    answer: "É ideal para crianças a partir de 3 anos que estão na fase de pré-alfabetização, até crianças maiores (7, 8 ou 9 anos) que estejam encontando barreiras nos métodos tradicionais de ensino escolar."
  },
  {
    question: "Serve para qualquer nível de autismo?",
    answer: "Sim! Por ser extremamente visual, estruturado e com poucas distrações por página, ele atende desde crianças com autismo nível 1 (com ou sem fala) até nível 2 e 3 que necessitam de mais suporte visual, pareamento e atividades táteis."
  },
  {
    question: "E se meu filho não demonstrar interesse no início?",
    answer: "Isso é perfeitamente normal! No 'Guia de Apoio para os Pais' que enviamos como presente, ensinamos técnicas específicas de aproximação progressiva, rotina de estudos de apenas 10 minutos por dia e sistemas de reforço positivo que diminuem a resistência natural do cérebro autista."
  },
  {
    question: "Como funciona a garantia?",
    answer: "Oferecemos uma garantia incondicional de 7 dias. Se por qualquer motivo você ou seu filho não se adaptarem ao material, basta nos enviar um e-mail para receber 100% do seu dinheiro de volta, sem perguntas."
  }
];
