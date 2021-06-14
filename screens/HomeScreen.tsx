import React, {useState, useMemo} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import ModalCommon from '../components/ModalCommon';
import {TaskType} from '../components/TaskItem';
import TaskItem from '../components/TaskItem';

interface HomeScreenProps {
  navigation: any;
}
function HomeScreen({navigation}: HomeScreenProps) {
  const [showModal, setShowModal] = useState(false);
  const [taskValue, setTaskValue] = useState<string | undefined>('');
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [error, setError] = useState('');
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const _onShowModal = () => {
    setShowModal(true);
  };
  const _onClose = () => {
    setShowModal(false);
    setTaskValue('');
    setError('');
    setEditTaskId(null);
  };
  const _onDone = () => {
    if (!taskValue || taskValue?.trim() === '') {
      setError('Please add something');
      return;
    }
    if (editTaskId) {
      const newTasks = [...tasks];
      newTasks.forEach(task => {
        if (task.id === editTaskId) {
          task.value = taskValue.trim();
        }
      });
      setTasks(newTasks);
      ToastAndroid.show('Updated task successfully!', ToastAndroid.SHORT);
    } else {
      setTasks([
        ...tasks,
        {
          id: new Date().getTime().toString(),
          value: taskValue.trim(),
          done: false,
        },
      ]);
    }

    _onClose();
  };

  const _onChangeTaskValue = (value: string) => {
    setTaskValue(value);
  };
  const _updateTask = (id: string) => {
    const task = tasks.find(e => e.id === id);
    setShowModal(true);
    setTaskValue(task?.value);
    setEditTaskId(id);
  };
  const _removeTask = (id: string) => {
    setTasks([...tasks.filter(task => task.id !== id)]);
    ToastAndroid.show('Deleted task successfully!', ToastAndroid.SHORT);
  };
  const _setDone = (id: string) => {
    const newTasks = [...tasks];
    newTasks.forEach(task => {
      if (task.id === id) {
        task.done = !task.done;
      }
    });
    setTasks(newTasks);
    ToastAndroid.show('Updated task successfully!', ToastAndroid.SHORT);
  };
  const totalTaskDone = useMemo(
    () => tasks.filter(task => task.done).length,
    [tasks],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.todayLabel}>{new Date().toDateString()}</Text>
      <Button title={'Add new task'} onPress={_onShowModal} />
      <View style={styles.dashboard}>
        <View style={styles.dashboardItemTotal}>
          <Text style={styles.titleDashboard}>{'Total'}</Text>
          <Text style={styles.valueDashboard}>
            {`${tasks.length} ${tasks.length > 1 ? 'tasks' : 'task'}`}
          </Text>
        </View>
        <View style={styles.dashboardItemDone}>
          <Text style={styles.titleDashboard}>{'Done'}</Text>
          <Text style={styles.valueDashboard}>
            {`${totalTaskDone} ${totalTaskDone > 1 ? 'tasks' : 'task'}`}
          </Text>
        </View>
        <View style={styles.dashboardItemRemaining}>
          <Text style={styles.titleDashboard}>{'Remaining'}</Text>
          <Text style={styles.valueDashboard}>
            {`${tasks.length - totalTaskDone} ${
              tasks.length - totalTaskDone > 1 ? 'tasks' : 'task'
            }`}
          </Text>
        </View>
      </View>

      <FlatList
        style={styles.flatList}
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={item => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Detail', {task: item.item});
            }}>
            <TaskItem
              onUpdate={() => _updateTask(item.item.id)}
              onDelete={() => _removeTask(item.item.id)}
              onSetDone={() => _setDone(item.item.id)}
              index={item.index}
              task={item.item}
            />
          </TouchableOpacity>
        )}
      />

      <ModalCommon
        title={editTaskId ? 'Update task' : 'Create task'}
        onClose={_onClose}
        onDone={_onDone}
        visible={showModal}>
        <View>
          <TextInput
            placeholder="Add something..."
            style={styles.input}
            value={taskValue}
            onChangeText={_onChangeTaskValue}
          />
          {!!error && <Text style={styles.errorMessage}>{error}</Text>}
        </View>
      </ModalCommon>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  todayLabel: {
    textAlign: 'center',
    marginBottom: 5,
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 4,
    width: 400,
    paddingHorizontal: 16,
  },
  errorMessage: {
    color: 'red',
  },
  flatList: {
    marginBottom: 100,
  },
  dashboard: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dashboardItemTotal: {
    borderRadius: 4,
    padding: 20,
    borderWidth: 1,
    width: '32%',
    borderColor: '#1e90ff',
    backgroundColor: '#1e90ff',
  },
  dashboardItemDone: {
    borderRadius: 4,
    padding: 20,
    borderWidth: 1,
    width: '32%',
    borderColor: '#3bb54a',
    backgroundColor: '#3bb54a',
  },
  dashboardItemRemaining: {
    borderRadius: 4,
    padding: 20,
    borderWidth: 1,
    width: '32%',
    borderColor: '#f44235',
    backgroundColor: '#f44235',
  },
  titleDashboard: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  valueDashboard: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
  },
});
export default HomeScreen;
