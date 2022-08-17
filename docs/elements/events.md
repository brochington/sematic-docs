# Events

[view source code](https://github.com/brochington/sematle/blob/main/sema-api/src/sema/event.rs)

```rust
pub struct Event {
  pub event_type: String,
  pub symbol: String,
  pub properties: Vec<EventProperties>,
}

pub enum EventProperties {
  Action { action: String },
  Occurance { occurs: String },
  Duration { duration: String },
  Tense { tense: Tense },
  Location { location: String }
}
```