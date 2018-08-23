// @flow

export default {
  // posts: (_, args, context, info) => {
  //   return context.prisma.query.posts(
  //     {
  //       where: {
  //         OR: [
  //           {title_contains: args.searchString},
  //           {content_contains: args.searchString},
  //         ],
  //       },
  //     },
  //     info,
  //   );
  // },
  users: (_, args, context, info) => {
    return context.prisma.query.users({}, info);
  },
  user: (_, args, context, info) => {
    return context.prisma.query.user(
      {
        where: {
          id: args.id,
        },
      },
      info,
    );
  },
};
