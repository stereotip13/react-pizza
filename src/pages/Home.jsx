import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { data } from '../helpers/data.js'

const Home = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {/* //специальный див для инлайновых стилей, скачал пример карточки, обернул в
    див, в кот указал стили инлайново если не хотим исп-ть слово return, то
    используем скобку ()     */}
    {data.map((pizza) => (
      <Card key={pizza.id} sx={{ maxWidth: 345, margin: '10px' }}>
        {/* при использовании мар обязательно указывать key */}
        <CardMedia
          sx={{ height: 345 }}
          image={pizza.image}
          title={pizza.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pizza.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pizza.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    ))}
  </div>
)

export default Home
