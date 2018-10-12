//Acquiring the nlp text classifier
var Classifier =require('wink-naive-bayes-text-classifier');
//Acquiring the nlp utility attributes
var nlp =require('wink-nlp-utils');

//initiate
var nbc= Classifier();

// acquiring data
var data=require('./cta.json');
//Configuration of nlp utilities
nbc.definePrepTasks( [
  // Simple tokenizer
  nlp.string.tokenize0,
  // Common Stop Words Remover
  nlp.tokens.removeWords,
  // Stemmer to obtain base word
  nlp.tokens.stem
] );

// Configure behavior
nbc.defineConfig( { considerOnlyPresence: true, smoothingFactor: 0.5 } );
for (key in data)
{
	nbc.learn(data[key][0],data[key][1]);
}

//consodilating the text learning

nbc.consolidate();
// front end code
var number=prompt("Enter 1 to predict your text ",0);
while(number)
{
	 var text=prompt("Enter the text that need to be predicted");
	 var predictions=nbc.predict(text);
	 alert(predictions);
}
