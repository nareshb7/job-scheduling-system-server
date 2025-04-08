export const generateNewId = (data) => {
  return (
    data.slice(0, 3).toLowerCase() + Math.random().toString(16).slice(2, 7)
  );
};

// const generateUserID = async (data) => {
//     const ids = await signUpModel.aggregate([
//         { $group: { _id: 'userIds', userIds: { $push: '$userId' } } }
//     ])
//     const id = generateNewId(data)
//     if (ids[0].userIds.includes(id)) {
//         generateUserID(data)
//     } else {
//         return id
//     }
// }
