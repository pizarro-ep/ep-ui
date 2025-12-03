import { EpSelectItem } from "@ep/components";

export const MAP_PROPS_HEADER = [
    { title: 'Propiedad', key: 'prop' },
    { title: 'Tipo', key: 'type' },
    { title: 'Defecto', key: 'default' },
    { title: 'Descripción', key: 'description' },
]

export const MAP_FORM_TYPES: EpSelectItem[] = [
    { label: 'ngModel', value: 'ngModel' },
    { label: 'formControl', value: 'formControl' },
]

export const DOCUMENTATION = {
    components: {
        appbar: {
            title: "Appbar (ep-appbar)",
            description: "El componente ep-appbar se utiliza como barra superior de navegación fija. Proporciona un área para el título, logotipo y accesos rápidos a acciones clave de la aplicación.",
        },
        appbarHeader: {
            title: "Appbar Header (ep-appbar-header)",
            description: "Define la sección inicial dentro del appbar, ideal para mostrar títulos, logotipos o la identidad principal de la aplicación.",
        },
        appbarMenu: {
            title: "Appbar Menu (ep-appbar-menu)",
            description: "Agrupa y organiza las opciones de navegación o acciones contextuales dentro del appbar en un menú accesible.",
        },
        button: {
            title: "Button (ep-button)",
            description: "Un botón configurable que admite colores, tamaños y variantes de estilo. Se utiliza para ejecutar acciones primarias o secundarias.",
        },
        card: {
            title: "Card (ep-card)",
            description: "Agrupa contenido en un contenedor con estilo, proporcionando un diseño limpio para mostrar información, acciones o elementos relacionados.",
        },
        checkbox: {
            title: "Checkbox (ep-checkbox)",
            description: "Permite seleccionar una o varias opciones en un conjunto. Ideal para configuraciones múltiples o filtros en formularios.",
        },
        chip: {
            title: "Chip (ep-chip)",
            description: "Muestra etiquetas compactas para representar datos, estados o acciones rápidas. Soporta colores y variantes adaptadas al tema.",
        },
        copy: {
            title: "Copy (ep-copy)",
            description: "Proporciona un botón de copiar texto al portapapeles. Útil en fragmentos de código, enlaces o información reutilizable.",
        },
        divider: {
            title: "Divider (ep-divider)",
            description: "Separa visualmente secciones de contenido mediante una línea horizontal o vertical, mejorando la organización y legibilidad.",
        },
        entriesSelector: {
            title: "Entries Selector (ep-entries-selector)",
            description: "Permite al usuario elegir cuántos elementos mostrar en tablas o listados, facilitando la paginación y el control de datos.",
        },
        icon: {
            title: "Icon (ep-icon)",
            description: "Renderiza íconos personalizados y escalables que se adaptan al color, tamaño y estilo definidos en el tema.",
        },
        input: {
            title: "Input (ep-input)",
            description: "Campo de texto para capturar entradas del usuario. Soporta validaciones, estados de error y estilos personalizados.",
        },
        list: {
            title: "List (ep-list)",
            description: "Muestra elementos en un formato de lista ordenada o no ordenada. Puede incluir íconos, subítems y estilos configurables.",
        },
        listItem: {
            title: "List Item (ep-list-item)",
            description: "Define un elemento dentro de ep-list. Puede incluir texto, íconos y acciones adicionales, como enlaces o botones.",
        },
        menu: {
            title: "Menu (ep-menu)",
            description: "Muestra un menú desplegable que agrupa opciones o acciones relacionadas. Puede contener contenido proyectado o listas dinámicas.",
        },
        modal: {
            title: "Modal (ep-modal)",
            description: "Muestra un cuadro de diálogo superpuesto para resaltar contenido importante o confirmar acciones del usuario.",
        },
        paginator: {
            title: "Paginator (ep-paginator)",
            description: "Facilita la navegación entre páginas de datos extensos. Incluye controles de siguiente, anterior y selección de página.",
        },
        radio: {
            title: "Radio (ep-radio)",
            description: "Permite seleccionar una sola opción de un conjunto definido. Útil en formularios y configuraciones exclusivas.",
        },
        select: {
            title: "Select (ep-select)",
            description: "Muestra un menú desplegable para elegir un valor de una lista. Soporta opciones simples o contenido proyectado.",
        },
        sidebar: {
            title: "Sidebar (ep-sidebar)",
            description: "Un contenedor lateral que organiza la navegación o contenido complementario. Puede fijarse o colapsarse.",
        },
        slider: {
            title: "Slider (ep-slider)",
            description: "Permite seleccionar un valor dentro de un rango arrastrando un control deslizante. Soporta pasos y estilos personalizados.",
        },
        switch: {
            title: "Switch (ep-switch)",
            description: "Componente de estado binario que permite activar o desactivar una opción. Compatible con variantes de diseño, tamaños responsivos y animaciones personalizadas.",
        },
        table: {
            title: "Table (ep-table)",
            description: "Organiza datos en filas y columnas para facilitar la visualización estructurada. Puede incluir filtros, paginación y estilos dinámicos.",
        },
        textarea: {
            title: "Textarea (ep-textarea)",
            description: "Campo de entrada que permite al usuario escribir múltiples líneas de texto, con soporte para validaciones y estados de error.",
        },
    },
    directives: {
        actions: {
            title: "Actions (epActions)",
            description: "Agrupa botones o controles interactivos dentro de un contenedor estilizado.",
        },
        activator: {
            title: "Activator (epActivator)",
            description: "Define el elemento que activa un componente hijo, como menús, popovers o tooltips.",
        },
        append: {
            title: "Append (epAppend)",
            description: "Inserta contenido al final de un componente, normalmente íconos o elementos decorativos.",
        },
        container: {
            title: "Container (epContainer)",
            description: "Proporciona un contenedor consistente para organizar contenido.",
        },
        content: {
            title: "Content (epContent)",
            description: "Envuelve contenido principal dentro de un bloque con espaciado y estilos estándar.",
        },
        divider: {
            title: "Divider (epDivider)",
            description: "Dibuja una línea o separación visual entre secciones o elementos.",
        },
        footer: {
            title: "Footer (epFooter)",
            description: "Zona inferior que agrupa botones, enlaces o acciones finales dentro de un componente.",
        },
        header: {
            title: "Header (epHeader)",
            description: "Encabezado estilizado para títulos, subtítulos o acciones primarias.",
        },
        number: {
            title: "Number (epNumber)",
            description: "Control especializado para manejar y validar valores numéricos.",
        },
        prepend: {
            title: "Prepend (epPrepend)",
            description: "Inserta contenido al inicio de un componente, típicamente íconos o etiquetas.",
        },
        rotate: {
            title: "Rotate (epRotate)",
            description: "Aplica rotación animada o estática a un elemento.",
        },
        table: {
            captiom: {
                title: "Table Caption (epCaption)",
                description: "Sección que muestra el título o descripción general de la tabla.",
            },
            column: {
                title: "Table Column (epColumn)",
                description: "Define una columna dentro de la tabla y controla cómo se renderiza su contenido.",
            },
            footer: {
                title: "Table Footer (epFooter)",
                description: "Área inferior destinada para mostrar acciones, botones o información complementaria de la tabla.",
            },
        },
        text: {
            title: "Text (epText)",
            description: "Formato tipográfico para textos con variantes de tamaño, peso y color.",
        },
        title: {
            title: "Title (epTitle - epSubTitle)",
            description: "Título estilizado para encabezados principales dentro de una sección o componente. También contiene subtítulos para encabezados secundarios de una sección o componente.",
        },
        tooltip: {
            title: "Tooltip (epTooltip)",
            description: "Muestra un mensaje flotante contextual al pasar o enfocar un elemento.",
        },
    },
    usage: 'Aquí puedes probar las diferentes configuraciones de $s y ver en tiempo real el código generado según las propiedades seleccionadas.',
    props: "A continuación se describen las propiedades disponibles para $s, con sus valores predeterminados, tipos y comportamiento asociado.",
}
