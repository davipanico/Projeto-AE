import { User } from "../entities/User";

export default {
  render(user: User){
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}