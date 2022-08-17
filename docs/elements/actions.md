# Actions

[view source code](https://github.com/brochington/sematle/blob/main/sema-api/src/sema/action.rs)

## Properties

```rust
pub struct Action {
  pub action_type: String, // bark, eat, be, etc.
  pub symbol: String,
  pub properties: Vec<ActionProperties>,
}

pub enum ActionProperties {
  Agent { agent: String },
  Patient { patient: String },
  Instrument { instrument: String },
  Benefactive { benefactive: String },
  Outcome { outcome: String },
  Recipient { recipient: String },
  Direction { direction: Directions },
  Attribute { attribute: String },
  Purpose { purpose: String }, // symbol to an action or event
  Negate { negate: bool },
}
```