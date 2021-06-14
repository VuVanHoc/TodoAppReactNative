import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
export interface TaskType {
  id: string;
  value: string;
  done: boolean;
}
interface TaskItemProps {
  task: TaskType;
  index: number;
  onDelete: () => void;
  onUpdate: () => void;
  onSetDone: () => void;
}

function TaskItem({task, index, onDelete, onUpdate, onSetDone}: TaskItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>
        {index + 1}. {task.value}
      </Text>
      <View style={styles.actionMenu}>
        <TouchableOpacity onPress={onSetDone}>
          {task.done ? (
            <Image
              source={require('../assets/check.png')}
              style={styles.icon}
            />
          ) : (
            <Image
              source={require('../assets/uncheck.png')}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onUpdate}>
          <Image source={require('../assets/edit.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Image source={require('../assets/remove.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingVertical: 4,
  },
  actionMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  value: {
    width: '80%',
    fontSize: 16,
  },
});

export default TaskItem;
