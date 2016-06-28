package libserver

import "container/list"

type Cache struct {
	Cap  int
	list *list.List
	hash map[interface{}]*list.Element
}

type item struct {
	key   interface{}
	value interface{}
}

func NewCache(cap int) *Cache {
	return &Cache{
		Cap:  cap,
		list: list.New(),
		hash: make(map[interface{}]*list.Element),
	}
}

func (c *Cache) Len() int {
	return c.list.Len()
}

func (c *Cache) Add(key interface{}, val interface{}) {
	// Check if the key is already used. If so, remove the corresponding node
	// from the list
	if el, ok := c.hash[key]; ok {
		c.list.Remove(el)
	}

	if c.Len() == c.Cap {
		// eject the oldest item before adding a new one
		oldest := c.list.Back()
		if oldest != nil {
			c.list.Remove(oldest)
			delete(c.hash, oldest.Value.(*item).value)
		}
	}

	newitem := &item{key, val}

	el := c.list.PushFront(newitem)
	c.hash[key] = el
}

func (c *Cache) Get(key interface{}) interface{} {
	// get the requested element and move it to the front
	el := c.hash[key]

	// check that the element is there
	if el == nil {
		return nil
	}

	val := el.Value.(*item).value
	c.list.MoveToFront(el)
	return val
}
