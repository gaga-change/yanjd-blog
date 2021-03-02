/**
 * 完善数据，将tagId 转为tag对象
 * @param postList
 * @param tagMap
 * @returns {*}
 */
export function turnPostList (postList, tagMap) {
  return postList.map((item) => {
    const tagIds = item.tags
    const tagsArr = []
    item.tags = tagsArr
    tagIds.forEach((id) => {
      const name = tagMap.get(id)
      if (name) {
        tagsArr.push({ id, name })
      }
    })
    return item
  })
}
