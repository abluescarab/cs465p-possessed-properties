#!/bin/bash
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
#printf "import \"./%s.scss\";\n\n" $TYPE >> $TSX
#printf "const %s = () => {};\n\n" $TYPE >> $TSX
#printf "export default %s" $TYPE >> $TSX
