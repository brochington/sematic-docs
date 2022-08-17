# Agents

[view source code](https://github.com/brochington/sematle/blob/main/sema-api/src/sema/agents.rs)

_Agents_ are the entities that are capable of performing actions. They are usually people, but can also be other things.

## Agent variants

```rust
pub enum Agents {
  Ego(Ego),
  Subject(Subject),
  Person(Person),
  Group(Group),
  Company(Company),
}
```

### Ego

_Ego_ is a special agent type that represents the user who is "talking", and is usually indicated by the use of the word "I" or "me". e.g. `I am a doctor`

```rust
pub struct Ego {
  pub symbol: String,
  pub properties: Vec<AgentProperties>,
}

pub enum AgentProperties {
  Modifier {
    modifier_type: String, // category (chromatic)
    modifier: Option<String>, // actual language used (colored)
    amplifiers: Vec<String>, // like satellites (hot pink)
  },
}
```

### Subject

Not used yet.

### Person

A human being.

```rust
pub struct Person {
  pub symbol: String,
  pub properties: Vec<PersonProperties>,
}

pub enum PersonProperties {
  Subject { subject: bool }, // Subject is for targeting. Basically the opposite of "Ego"
  Name { name: String },
  FirstName { first_name: String },
  LastName { last_name: String },
  Email { email: String },
  PhoneNumber { phone_number: String },
  Address { address: String },
  Modifier {
    modifier_type: String, // category (chromatic)
    modifier: Option<String>, // actual language used (colored)
    amplifiers: Vec<String>, // like satellites (hot pink)
  },
  Gender {
    gender: Genders
  }
}
```

### Group

```rust
pub struct Group {
  pub symbol: String,
  pub properties: Vec<GroupProperties>,
}

pub enum GroupProperties {
  Name { name: String },
  Members { members: Vec<String> },
  Location { location: String },
}
```

### Company

```rust
pub struct Company {
  pub symbol: String,
  pub properties: Vec<CompanyProperties>,
}

pub enum CompanyProperties {
  Name { name: String },
  PhoneNumber { phone_number: String },
  Email { email: String },
  Industry { industry: String },
  Profession { profession: String },
}
```
