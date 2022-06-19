package main

import (
	"bufio"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"runtime"
	"strconv"
	"strings"
)

/*
 * Complete the 'writeToFile' function below.
 *
 * The function accepts following parameters:
 *  1. chan []byte bytesChannel
 *  2. chan bool doneChannel
 *  3. chan error errChannel
 */

func writeToFile(bytesChannel chan []byte, doneChannel chan bool, errChannel chan error) {
	// create the new file
	newFile, err := os.Create(filename)
	if err != nil {
		errChannel <- err
	}
	defer newFile.Close()
	// send nil to errChannel
	errChannel <- nil

	// write to the file until doneChannel is closed
	for {
		select {
		case bytes := <-bytesChannel:
			_, err := newFile.Write(bytes)
			if err != nil {
				errChannel <- err
			}
			errChannel <- nil
		case <-doneChannel:
			return
		}
	}
}

func main() {
	reader := bufio.NewReaderSize(os.Stdin, 16*1024*1024)

	stdout, err := os.Create(os.Getenv("OUTPUT_PATH"))
	checkError(err)

	defer stdout.Close()

	writer := bufio.NewWriterSize(stdout, 16*1024*1024)

	inputArrayCount, err := strconv.ParseInt(strings.TrimSpace(readLine(reader)), 10, 64)
	checkError(err)

	var inputArray []string

	for i := 0; i < int(inputArrayCount); i++ {
		inputArrayItem := readLine(reader)
		inputArray = append(inputArray, inputArrayItem)
	}

	bytesChannel, doneChannel, errChannel := make(chan []byte), make(chan bool), make(chan error)
	var ms runtime.MemStats
	runtime.ReadMemStats(&ms)
	allocBefore := ms.Alloc
	go writeToFile(bytesChannel, doneChannel, errChannel)
	err = <-errChannel
	if err != nil {
		panic(err)
	}
	for _, b := range inputArray {
		bytesChannel <- []byte(b)
		err := <-errChannel
		if err != nil {
			fmt.Fprintf(writer, "Critical error: %s", err.Error())
			break
		}
	}
	doneChannel <- true
	runtime.ReadMemStats(&ms)
	allocAfter := ms.Alloc
	fmt.Printf("Total memory allocated: %d bytes\n", allocAfter-allocBefore)
	if allocAfter-allocBefore > 10000 {
		fmt.Fprintf(writer, "Too much memory allocated, maximum 10000 bytes needed")
	} else {
		b, err := ioutil.ReadFile(filename)
		if err == nil {
			fmt.Fprintf(writer, "%s\n", string(b))
		} else {
			fmt.Fprintf(writer, "Critical error: %s", err.Error())
		}
	}

	writer.Flush()
}

const filename = "output"

func readLine(reader *bufio.Reader) string {
	str, _, err := reader.ReadLine()
	if err == io.EOF {
		return ""
	}

	return strings.TrimRight(string(str), "\r\n")
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}
