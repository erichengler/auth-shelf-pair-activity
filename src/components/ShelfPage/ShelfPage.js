import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);
  const [shelfItem, setShelfItem] = useState([]);

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  const addItem = (event) => {
    event.preventDefault();
    axios.post('/api/shelf', shelfItem).then(res => {
        console.log(res.data);
        fetchShelf();
      }).catch(error => {
        console.log(`Error in addItem: ${error}`);
      });
  }

  const deleteItem = (id) => {
    console.log(id)
    axios.delete(`/api/shelf/${id}`).then(res => {
      fetchShelf();
    }).catch(error => {
      console.log(`Error in deleteItem: ${error}`);
    });
  }

  const handleDescription = (event) => {
    setShelfItem({ ...shelfItem, description: event.target.value});
  }

  const handleImageURL = (event) => {
    setShelfItem({ ...shelfItem, image_url: event.target.value});
  }

  return (
    <div className="container">
      <h2>Add Item</h2>
      <form onSubmit={addItem}>
        <input onChange={handleDescription} type="text" placeholder="Description" />
        <input onChange={handleImageURL} type="text" placeholder="Image URL" />
        <input type="submit" />
        <br /><br />
      </form>
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button style={{cursor: 'pointer'}} 
                            onClick={() => deleteItem(item.id)}>
                            Delete
                          </button>
                        </div>
                    </div>
                 </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
