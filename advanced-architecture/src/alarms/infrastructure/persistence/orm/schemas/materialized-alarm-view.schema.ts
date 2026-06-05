import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class MaterializedAlarmView {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  severity: string;

  @Prop(
    raw([
      {
        id: String,
        name: String,
        type: {
          type: String,
        },
      },
    ]),
  )
  items: Array<{
    id: string;
    name: string;
    type: string;
  }>;

  constructor(
    id: string,
    name: string,
    severity: string,
    items: Array<{
      id: string;
      name: string;
      type: string;
    }>,
  ) {
    this.id = id;
    this.name = name;
    this.severity = severity;
    this.items = items;
  }
}

export const MaterializedAlarmViewSchema = SchemaFactory.createForClass(
  MaterializedAlarmView,
);
