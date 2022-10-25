const handleScroll = (direction, ref) => {
  if (direction === 'right') {
    ref.current.scrollLeft += ref.current.offsetWidth;
  } else {
    ref.current.scrollLeft -= ref.current.offsetWidth;
  }
};

export default handleScroll;
