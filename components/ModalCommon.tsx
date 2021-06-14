import React from 'react';
import {Modal, Button, Text, View, StyleSheet} from 'react-native';

interface ModalCommonProps {
  title: string;
  visible: boolean;
  children: any;
  onClose: () => void;
  onDone: () => void;
}
function ModalCommon({
  title,
  visible,
  onClose,
  onDone,
  children,
}: ModalCommonProps) {
  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          {children}
          <View style={styles.buttonView}>
            <Button title="Close" color="red" onPress={onClose} />
            <Button title="Done" onPress={onDone} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  subContainer: {
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default ModalCommon;
