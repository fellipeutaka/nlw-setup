import { randomUUID } from "node:crypto";

type WeekDaysProps = {
  weekDay: number;
};

export class WeekDay {
  private _id: string;
  private props: WeekDaysProps;

  constructor(props: WeekDaysProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public get id() {
    return this._id;
  }

  public get weekDay() {
    return this.props.weekDay;
  }
}
