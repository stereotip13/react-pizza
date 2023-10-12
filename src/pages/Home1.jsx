import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { data } from '../helpers/data.js'
import { pizzaContext } from '../context/PizzaContext.js'

const Home = () => {
  const [isModal, setIsModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [newPizza, setNewPizza] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    id: Date.now(),
  })
  const [editedPizza, setEditedPizza] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    id: Date.now(),
  })
  //с помощью хука юзконтекст подключаем контекс из пица контекст провайдер
  const {
    addPizza,
    getPizzas,
    pizzas,
    deletePizza,
    getOnePizza,
    editPizza,
    onePizza,
  } = useContext(pizzaContext)
  useEffect(() => {
    getPizzas()
  }, [])
  //получаем onePizza, изначально onePizza = null, поэтому ставим знак ?, чтобы реакт искал значение, и если его нет выводил какое есть
  useEffect(() => {
    setEditedPizza({
      name: onePizza?.name || '',
      price: onePizza?.price || 0,
      description: onePizza?.description || '',
      image: onePizza?.image || '',
      id: onePizza?.id || Date.now(),
    })
  }, [onePizza])
  //добавление данных на форме
  function handleEdit() {
    editPizza(onePizza.id, editedPizza)
    setEditModal(false) //закрываем модалку, ниже обнуляем все, что было прописано
    setEditedPizza({
      name: '',
      price: 0,
      description: '',
      image: '',
      id: '',
    })
  }

  //меняется значение изМодал окно открывается и закрывается
  function handleClose() {
    setIsModal(false)
  }
  //закрываем модалку по редактиованию
  function editHandleClose() {
    setEditModal(false)
  }
  function handleAdd() {
    addPizza(newPizza)
    setIsModal(false) //закрываем модалку
    //обнуляем содержимое модалки, чтобы не сохранялось
    setNewPizza({
      name: '',
      price: 0,
      description: '',
      image: '',
      id: Date.now(),
    })
  }
  return (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}
      >
        <Button
          variant="outlined"
          size="large"
          onClick={() => setIsModal(true)}
        >
          Add Pazza
        </Button>
      </div>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {/* //специальный див для инлайновых стилей, скачал пример карточки, обернул в
    див, в кот указал стили инлайново если не хотим исп-ть слово return, то
    используем скобку ()     */}
        {pizzas.map((pizza) => (
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
              <Button
                onClick={(() => getOnePizza(pizza.id), setEditModal(true))}
                size="small"
              >
                Edit
              </Button>
              <Button onClick={() => deletePizza(pizza.id)} size="small">
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <Dialog open={isModal} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            autoComplete="off"
            id="name"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setNewPizza({ ...newPizza, price: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            autoComplete="off"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setNewPizza({ ...newPizza, description: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            autoComplete="off"
            label="Image Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) =>
              setNewPizza({ ...newPizza, image: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editModal} onClose={editHandleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={editedPizza.name}
            onChange={(e) =>
              setEditedPizza({ ...editedPizza, name: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            autoComplete="off"
            id="name"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={editedPizza.price}
            onChange={(e) =>
              setEditedPizza({ ...editedPizza, price: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            autoComplete="off"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={editedPizza.description}
            onChange={(e) =>
              setEditedPizza({ ...editedPizza, description: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            autoComplete="off"
            label="Image Address"
            type="text"
            fullWidth
            variant="standard"
            value={editedPizza.image}
            onChange={(e) =>
              setEditedPizza({ ...editedPizza, image: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={editHandleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Home
