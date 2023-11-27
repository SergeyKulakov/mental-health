import React from 'react';
import { View } from 'react-native';
import { oneOfType, string, number, node } from 'prop-types';
import { AirbnbRating } from 'react-native-ratings';

const StarRating = ({ defaultRating, size, ...props }) => {
  const ratingRoundOff = (rating) => {
    return Math.round(rating);
  };

  return (
    <View>
      <AirbnbRating
        {...props}
        count={5}
        defaultRating={ratingRoundOff(defaultRating)}
        showRating={false}
        reviewColor="red"
        selectedColor="#FFCD67"
        size={size || 13}
      />
    </View>
  );
};

StarRating.propTypes = {
  defaultRating: oneOfType([string, number]).isRequired,
  size: oneOfType([string, number]).isRequired,
  props: node.isRequired,
};

export default StarRating;
