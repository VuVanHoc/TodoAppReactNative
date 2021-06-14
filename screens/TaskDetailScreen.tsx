import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
interface TaskDetailScreenProps {
  route: any;
}
function TaskDetailScreen({route}: TaskDetailScreenProps) {
  const {task} = route.params;
  return (
    <View style={styles.container}>
      <Text>{`Created Date: ${new Date(parseFloat(task.id))}`}</Text>

      <Text>{task.id}</Text>
      <Text>{task.value}</Text>
      <Text>{task.done ? 'Done' : 'Not Done'}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
export default TaskDetailScreen;
