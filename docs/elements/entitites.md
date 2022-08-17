# Entities

[view source](https://github.com/brochington/sematle/blob/main/sema-api/src/sema/entity.rs)

```rust
pub struct Entity {
  pub entity_type: String,
  pub symbol: String,
  pub properties: Vec<EntityProperties>,
}

pub enum Quantities {
  All,
  None,
  Some,
  Few,
  Many,
  Most,
  Multiple,
  Both,
  Single,
}

pub enum EntityProperties {
  Modifier {
    modifier_type: String, // category (chromatic)
    modifier: Option<String>, // actual language used (colored)
    amplifiers: Vec<String>, // like satellites (hot pink)
  },
  Count { count: f32 },
  Quantity { quantity: Quantities },
  Occurance { occurs: String }, // symbol to temporal
  Attribute { attribute: String },
}
```