import { Faker, ru, ja, ko, base } from "@faker-js/faker";

const getLocalizedFaker = (language) => {
  switch (language) {
    case "ru":
      return new Faker({ locale: [ru, base] });
    case "ja":
      return new Faker({ locale: [ja, base] });
    default:
      return new Faker({ locale: [ko, base] });
  }
};

const generateCoverImage = (title, author) => {
  const formattedTitle = encodeURIComponent(title);
  const formattedAuthor = encodeURIComponent(author);
  return `https://res.cloudinary.com/demo/image/upload/w_200,h_300,c_fit,l_text:Arial_20_bold:${formattedTitle}%0A${formattedAuthor},co_rgb:ffffff,g_center/v1600000000/background.jpg`;
};

const generateRating = (faker) => Math.round(faker.number.float({ min: 0, max: 10 }) * 10) / 10;

const calculateLikes = (avgLikes, faker) => {
  const intLikes = Math.floor(avgLikes);
  const fractionalLikes = avgLikes % 1;
  return faker.number.float({ min: 0, max: 1 }) < fractionalLikes ? intLikes + 1 : intLikes;
};

const generateLocalizedReviews = (faker, avgReviews) => {
  const reviewCount = calculateLikes(avgReviews, faker);
  return Array.from({ length: reviewCount }, () => ({
    text: faker.lorem.sentence(),
    author: faker.person.fullName(),
  }));
};

export const generateBooks = ({
  seed,
  page,
  batchSize,
  likes,
  reviews,
  language,
}) => {
  const faker = getLocalizedFaker(language);
  faker.seed(seed + page);

  const startIndex = page * batchSize;

  return Array.from({ length: batchSize }, (_, i) => ({
    index: startIndex + i + 1,
    isbn: faker.string.uuid(),
    title: faker.lorem.words(3),
    authors: faker.person.fullName(),
    publisher: faker.company.name(),
    likes: calculateLikes(likes, faker),
    rating: generateRating(faker),
    reviews: generateLocalizedReviews(faker, reviews),
    coverImage: generateCoverImage(
      faker.lorem.words(3),
      faker.person.fullName()
    ),
  }));
};
