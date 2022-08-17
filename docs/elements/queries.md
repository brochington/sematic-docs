# Queries (Questions)

[view source code](https://github.com/brochington/sematle/blob/main/sema-api/src/sema/query.rs)

Query elements indicated that a question is being asked. Currently this only detects the presence of a question, but soon it will also offer what is being asked. 

Basically if the API json response has a `query` element present, the sentence was a question.

