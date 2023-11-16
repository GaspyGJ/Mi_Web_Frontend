// Función para verificar si un elemento está en el viewport
export function isElementInViewport(el: any) {
  if (el === null) {
    return;
  }
  const rect = el.getBoundingClientRect();
  return (
    (rect.bottom >= -1 &&
      rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) + 1) ||
    (rect.top >= -1 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) + 1)
  );
};

export let handle = null;
export function addListeners(handleScroll: any) {
  handle = handleScroll;
  // Agrega el controlador de eventos al evento de scroll
  document.addEventListener('scroll', handleScroll);
  // Llama a handleScroll una vez al cargar la página (para manejar elementos ya en el viewport)
  document.addEventListener('load', handleScroll);
};
