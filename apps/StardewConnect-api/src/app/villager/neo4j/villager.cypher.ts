export const villagerCypher = {
  /**
   * params: id
   *
   * returns: villager
   */
  addVillager: 'CREATE (villager:Villager {id: $id}) RETURN villager',
  /** params: id */
  removeVillager:
    'MATCH (a:Villager {id: $id}) OPTIONAL MATCH (a)-[b:BEFRIENDS]->(u) DETACH DELETE a,b',
  /**
   * params: id, username
   *
   * returns: villager
   */
    befriendVillager:
    'MATCH (a:User {username: $username}), (b:Villager {id: $id}) MERGE (a)-[befriends:BEFRIENDS {numberOfHearts: 0}]->(b)',
    /**
     * params: id, username
     * 
     * returns: villager
     */
    unfriendVillager:
    'MATCH (a:User {username: $username})-[befriends:BEFRIENDS]->(b:Villager {id: $id}) DELETE befriends',
    /**
     * params: username
     * 
     * returns: villager
     */
    getBefriendedVillagers:
    'MATCH (a:User {username: $username})-[befriends:BEFRIENDS]->(b:Villager) RETURN b',
    /**
     * params: id, username, numberOfHearts
     * 
     * returns: villager
     */
    updateVillagerHearts:
    'MATCH (a:User {username: $username})-[befriends:BEFRIENDS]->(b:Villager {id: $id}) SET befriends.numberOfHearts = $numberOfHearts RETURN b',
    /**
     * params: id, username
     * 
     * returns: villager
     */
    getVillagerHearts:
    'MATCH (a:User {username: $username})-[befriends:BEFRIENDS]->(b:Villager {id: $id}) RETURN befriends.numberOfHearts',

}