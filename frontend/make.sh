#!/bin/bash
if [ $# -eq 0 ]; then
    >&2 echo "Usage: $0 DIR NAME"
    exit 1
fi

DIR=$1
TYPE=$2
SRC=./src/$DIR/$TYPE
TSX=$SRC/$TYPE.tsx
SCSS=$SRC/$TYPE.scss

mkdir $SRC
touch $TSX $SCSS
cat << EOF > $TSX
import "./$TYPE.scss";

const $TYPE = () => {
  return (
    <></>
  );
};

export default $TYPE;
EOF
