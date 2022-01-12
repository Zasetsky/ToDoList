import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, ((err: any) => {
  if (err) {
    console.error(err);
  }

  console.log(`server is listening on ${port}`);
}) as () => void);