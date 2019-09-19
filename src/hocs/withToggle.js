import React, { useState } from 'react';

export default (C, defaultOpened = false) => props => {
    const [opened, setOpened] = useState(defaultOpened);

    return <C {...props} opened={opened} toggle={() => setOpened(!opened)} />;
};