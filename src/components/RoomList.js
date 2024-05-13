import React from 'react';

function RoomList({ rooms, onSelectRoom }) {
    return (
        <div className="room-list">
            {rooms.map(room => (
                <div key={room.id} className="room-item" onClick={() => onSelectRoom(room)}>
                    <h3>{room.name}</h3>
                    <p>{room.description}</p>
                </div>
            ))}
        </div>
    );
}

export default RoomList;
