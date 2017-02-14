import React from "react";

const styles = {
    container: {
        padding: "16px",
        width: "400px",
        color: "#757575",
        margin: "0 auto 16px auto",
        borderRadius: "3px",
        backgroundColor: "#fff",
        textAlign: "center"
    },
    profileImage: {
        height: "60px",
        width: "60px",
        borderRadius: "50%"
    },
    profileName: {
        padding: "6px 0 12px 0",
        fontSize: "14px",
        color: "#616161"
    },
    spaceEater: {
        height: "20px",
        backgroundColor: "#e9ebee",
        marginBottom: "8px"
    }
};

const getSpaceEaters = (numSpaceEaters) => {
    let spaceEaters = [];

    for (let i = 0; i < numSpaceEaters; i++) {
        spaceEaters.push(<div style={styles.spaceEater} key={i}></div>);
    }

    return spaceEaters;
};

const ListItem = props => {
    const spaceEaters = getSpaceEaters(props.rowData.numSpaceEaters);

    return (
        <div style={styles.container}>
            <img style={styles.profileImage} src={props.rowData.avatar_url} role="presentation" />
            <div style={styles.profileName}>{props.rowData.login}</div>
            {spaceEaters}
        </div>
    );
};

export default ListItem;