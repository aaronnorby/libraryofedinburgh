package libserver

import (
	"container/list"
)

type Cache struct {
	cap  int
	list *list.List
	hash map[interface{}]*list.Element
}

func NewCache(cap int) *Cache {
	return &Cache{
		cap:  cap,
		list: list.New(),
	}
}

func (c *Cache) Len() int {
	return c.list.Len()
}

func (c *Cache) Add(key int64, val interface{}) {
	if c.Len() == c.cap {
		// eject the oldest item before adding a new one
		oldest := c.list.Back()
		if oldest != nil {
			c.list.Remove(oldest)
		}
	}

	el := c.list.PushFront(val)
	c.hash[key] = el
}

func (c *Cache) Get(key int64) interface{} {
	// get the requested element and move it to the front
	el := c.hash[key]

	// check that the element is there
	if el == nil {
		return nil
	}

	val := el.Value
	c.list.MoveToFront(el)
	return val
}
