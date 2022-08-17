# FAQ

## Why can't I just use Spacy, NLTK, or other NLP tools?

Spacy, NLTK, and other NLP tools are great, but they are not "off the shelf" solutions, but "toolboxes" that offer elements (NER, POS, etc) that must then be assembled into a useful product by a developer that is at least a little familiar with AI/ML/NLP.

## Why does this Sematle not use Machine Learning?

In the future we might! But using ML does have some drawbacks:
- Given a specific input, an ML model can not guarantee that it will always give the same output.
- In order to useful to developers, there needs to be known structure that they can trust. There is no guarantee that the ML model output will be correctly formatted and parsable, so additional error correction and validation will always be necessary.
- Large ML models inference can be very slow. This issue gets compounded if a solution requires multiple models to be run and combined.
- ML models usually require a GPU to run, which can be expensive, and a challenge to maintain. 
- In order to expand the vocabulary of an ML model, additional "fine-tuning" is required. A lot of additional data is needed, as well as retraining the model itself. With Sematle, adding more vocabulary should be as easy as updating a dictionary.

Since the goal of Sematle is amazing DX regardless of method, we will choose whatever technology is most appropriate to accomplish this goal, including Machine Learning. Features such as relationship extraction are not yet implemented in Sematle, and might only be possible with Machine Learning.