export const userCypher = {
  /**
   * params: username
   *
   * returns: user
   */
  addUser: 'CREATE (user:User {username: $username}) RETURN user',
  /** params: username */
  removeUser:
    'MATCH (a:User {username: $username}) OPTIONAL MATCH (a)-[f:FOLLOWS]->(u) OPTIONAL MATCH (u2)-[f1:FOLLOWS]->(a) DETACH DELETE a,f,f1',
  /**
   * params: username, newUsername
   *
   * returns: user
   */
  updateUsername:
    'MATCH (user:User {username: $username}) SET a.username = $newUsername RETURN user',
  /**
   * params: username, toFollow
   *
   * returns: user
   */
  followUser:
  'MATCH (a:User {username: $username}), (b:User {username: $toFollow}) MERGE (a)-[follow:FOLLOWS]->(b)',
  /** params: username, toUnfollow */
  unfollowUser:
    'MATCH (a:User {username: $username})-[follow:FOLLOWS]->(b:User {username: $toUnfollow}) DELETE follow',
  /**
   * params: username
   *
   * returns follower
   */
  getFollowers:
    'MATCH (a:User {username: $username})<-[follow:FOLLOWS]-(follower:User) RETURN follower',
  /**
   * params: username
   *
   * returns: following
   */
  getFollowing:
    'MATCH (a:User {username: $username})-[follow:FOLLOWS]->(following:User) RETURN following',
  /**
   * params: username
   *
   * returns: user
   */
  getRecommendations:
    'MATCH (a:User {username: $username})-[:FOLLOWS]->(b:User)-[:FOLLOWS]->(c:User) WHERE NOT (a)-[:FOLLOWS]->(c) AND NOT a = c RETURN c',
  /**
   * params: username
   *
   * returns: user
   */
  getUserFromBefriended:
    'MATCH (a:User {username: $username})-[:BEFRIENDS]->(v:Villager)<-[:BEFRIENDS]-(b:User) WHERE NOT (a)-[:FOLLOWS]->(b) AND NOT a = b RETURN b',
  /**
   * params: username, toFollow
   * 
   * returns: user
   */
  checkIfFollowing:
    'MATCH (a:User {username: $username})-[follow:FOLLOWS]->(b:User {username: $toFollow}) RETURN b', 
};
