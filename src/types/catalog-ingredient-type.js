import PropTypes from 'prop-types';

export const catalogIngredientType = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
})