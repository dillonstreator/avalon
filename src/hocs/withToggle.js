import React, { useState } from 'react';

export default (C, defaultOpened = false) => props => {
    const [isOpen, setIsOpened] = useState(defaultOpened);

    return <C {...props} isOpen={isOpen} toggle={() => setIsOpened(!isOpen)} />;
}
