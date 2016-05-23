class User{
  constructor( user ){
    this.passwordHash = user.passwordHash;
    this.userId = user.userId;
    this.email = user.email;
  }

  getUserId(){
    return this.userId;
  }

  getPasswordHash(){
    return this.passwordHash;
  }

  getEmail(){
    return this.email;
  }
}

module.exports = User;
