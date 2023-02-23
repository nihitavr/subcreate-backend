export const SchemaToJson = {
  virtuals: true,
  transform(doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
};

export const toJSON = <T>(item) => {
  return item?.toJSON();
};
