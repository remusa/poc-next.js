import { faker } from '@faker-js/faker'
import { factory, primaryKey } from '@mswjs/data'

const seed = 1826
faker.seed(seed)

export const db = factory({
  submission: {
    id: primaryKey(faker.datatype.number),
    brand: faker.company.companyName,
    retailer: faker.company.companyName,
    country: faker.address.country,
    store: faker.address.direction,
    submission: {
      id: faker.datatype.number,
      additionalData: () => '{"allowSoftReject":true,"checkinData":null,"countSoftReject":0}',
    },
    taskId: faker.datatype.uuid,
    type: faker.lorem.word,
    phoneNumber: faker.phone.number,
    userUuid: faker.datatype.uuid,
    score: faker.datatype.number,
    reviewed: faker.datatype.boolean,
    status: faker.lorem.word,
    value: () => '',
    approved: faker.datatype.boolean,
    comments: faker.lorem.words,
    imageCount: faker.datatype.number,
    version: () => 0,
    formType: () => 'ZUBALE',
    softReject: faker.datatype.number,
    createdOn: () => '2022-07-15T16:37:28.589974-05:00',
    modifiedOn: () => '2022-07-15T16:37:29.138712-05:00',
  },
})

new Array(5).fill(undefined).map(db.submission.create)
