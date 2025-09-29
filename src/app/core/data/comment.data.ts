import { Comment } from '@models/comments.model';

export const comments: Comment[] = [
  // Comments for News ID 1 - Breaking News: Major Event Unfolds
  {
    id: 1,
    content:
      'This is unbelievable! I was right there when it happened. The response was immediate and overwhelming.',
    userId: 1,
    newsId: 1,
  },
  {
    id: 2,
    content: 'I hope everyone is safe. Any updates on what actually happened?',
    userId: 2,
    newsId: 1,
  },
  {
    id: 3,
    content:
      '@gabriel The authorities are being very tight-lipped about it. Probably waiting for the press conference.',
    userId: 3,
    newsId: 1,
    parentCommentId: 2,
  },

  // Comments for News ID 2 - QuantumLeap AI Unveils 'Prometheus' Model
  {
    id: 4,
    content:
      'This AI advancement is both exciting and terrifying. The capabilities shown in the demo are mind-blowing!',
    userId: 2,
    newsId: 2,
  },
  {
    id: 5,
    content:
      "I'm concerned about the job market implications. We need proper regulations before this gets out of hand.",
    userId: 1,
    newsId: 2,
  },
  {
    id: 6,
    content:
      '@randy I agree about regulations, but think about the potential benefits for medical research and climate solutions!',
    userId: 3,
    newsId: 2,
    parentCommentId: 5,
  },

  // Comments for News ID 3 - NASA's Artemis Mission Confirms Water Ice on Europa
  {
    id: 7,
    content:
      'This is the most exciting space discovery in decades! Europa could actually harbor life!',
    userId: 3,
    newsId: 3,
  },
  {
    id: 8,
    content:
      "Amazing work by the NASA team. Can't wait to see what they find when they analyze the ice composition.",
    userId: 1,
    newsId: 3,
  },
  {
    id: 9,
    content:
      '@randy The possibilities are endless. This could change everything we know about life in the universe.',
    userId: 2,
    newsId: 3,
    parentCommentId: 8,
  },

  // Comments for News ID 4 - Tech Giant Merger Deal
  {
    id: 10,
    content:
      'Another mega-merger that will reduce competition. Not good for consumers in the long run.',
    userId: 1,
    newsId: 4,
  },
  {
    id: 11,
    content:
      'The scale of this deal is insane. $50 billion! Hope the antitrust authorities take a close look.',
    userId: 2,
    newsId: 4,
  },
  {
    id: 12,
    content:
      "@gabriel Absolutely. We can't let these tech giants control everything. Market competition is crucial.",
    userId: 3,
    newsId: 4,
    parentCommentId: 11,
  },

  // Comments for News ID 5 - Cancer Research Breakthrough
  {
    id: 13,
    content:
      'This gives me so much hope! My father is currently battling melanoma. Praying this leads to a cure soon.',
    userId: 2,
    newsId: 5,
  },
  {
    id: 14,
    content:
      'Incredible progress in medical research. The mRNA technology continues to show amazing potential.',
    userId: 3,
    newsId: 5,
  },
  {
    id: 15,
    content:
      '@darren Sending prayers for your father. This research really does offer hope for so many families.',
    userId: 1,
    newsId: 5,
    parentCommentId: 13,
  },

  // Comments for News ID 6 - Dragons Win World Championship
  {
    id: 16,
    content:
      'WHAT A GAME! That final clutch by Viper was absolutely legendary! Dragons deserved this win!',
    userId: 1,
    newsId: 6,
  },
  {
    id: 17,
    content:
      "As an Arctic Wolves fan, I'm devastated but have to respect that performance. What a series!",
    userId: 3,
    newsId: 6,
  },
  {
    id: 18,
    content:
      '@darren Both teams played their hearts out. This is why esports is so exciting to watch!',
    userId: 2,
    newsId: 6,
    parentCommentId: 17,
  },

  // Comments for News ID 7 - Nebula's End Movie Trailer
  {
    id: 19,
    content:
      "Just watched the trailer 5 times! The visual effects look absolutely stunning. Can't wait for release!",
    userId: 3,
    newsId: 7,
  },
  {
    id: 20,
    content:
      'James Croft is perfect for this role. The practical effects mixed with CGI look incredible.',
    userId: 1,
    newsId: 7,
  },
  {
    id: 21,
    content:
      "@randy I'm so glad they went with practical effects. It gives the world such an authentic feel.",
    userId: 2,
    newsId: 7,
    parentCommentId: 20,
  },

  // Comments for News ID 8 - Coral Reef Recovery
  {
    id: 22,
    content:
      'Finally some good environmental news! This gives me hope that we can still save our oceans.',
    userId: 2,
    newsId: 8,
  },
  {
    id: 23,
    content:
      'The innovative approach with heat-resistant coral and cold-water pumping is brilliant. More of this please!',
    userId: 1,
    newsId: 8,
  },
  {
    id: 24,
    content:
      '@randy This should be implemented worldwide. We need to scale up these conservation efforts immediately.',
    userId: 3,
    newsId: 8,
    parentCommentId: 23,
  },

  // Comments for News ID 9 - City of Lights Festival
  {
    id: 25,
    content:
      "I was there last night - absolutely magical! The drone show was beyond anything I've ever seen.",
    userId: 1,
    newsId: 9,
  },
  {
    id: 26,
    content:
      "The festival gets better every year. 'River of Dreams' theme was perfect for the waterfront setting.",
    userId: 3,
    newsId: 9,
  },
  {
    id: 27,
    content:
      '@darren The artistic installations were incredible too. Such talented international artists!',
    userId: 2,
    newsId: 9,
    parentCommentId: 26,
  },

  // Comments for News ID 10 - Climate Accord
  {
    id: 28,
    content:
      'Historic moment! Though I agree with environmentalists - the real work starts now with implementation.',
    userId: 3,
    newsId: 10,
  },
  {
    id: 29,
    content:
      '50% reduction by 2045 is ambitious but necessary. Hope all nations stick to their commitments.',
    userId: 2,
    newsId: 10,
  },
  {
    id: 30,
    content:
      '@gabriel The accountability mechanisms every five years will be crucial. No more empty promises.',
    userId: 1,
    newsId: 10,
    parentCommentId: 29,
  },

  // Comments for News ID 11 - Roman Concrete Mystery
  {
    id: 31,
    content:
      'Fascinating! Ancient Romans were way ahead of their time. Self-healing concrete could revolutionize construction.',
    userId: 1,
    newsId: 11,
  },
  {
    id: 32,
    content:
      'The engineering implications are huge. Imagine buildings that repair themselves over time!',
    userId: 3,
    newsId: 11,
  },
  {
    id: 33,
    content:
      '@darren And more sustainable too! This could reduce the environmental impact of concrete production.',
    userId: 2,
    newsId: 11,
    parentCommentId: 32,
  },
];
