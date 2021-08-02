import { GuestType } from "./enums";

export default interface Guest {
  id: number;
  name: string;
  type: GuestType;
  age?: number;
  family_id: number;
}
