import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

import { Replace } from "../utils/Replace";
import { WeekDay } from "./weekDay";

type HabitProps = {
  title: string;
  weekDays: WeekDay[];
  createdAt: Date;
};

export class Habit {
  private _id: string;
  private props: HabitProps;

  constructor(props: Replace<HabitProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? dayjs().startOf("day").toDate(),
    };
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get weekDays() {
    return this.props.weekDays;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
