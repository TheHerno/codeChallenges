package main

import (
	"bufio"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"strings"
)

/*
 * Complete the 'MergeReaders' function below.
 *
 * The function is expected to return an io.Reader and an error.
 * The function accepts following parameters:
 *  1. io.Reader r1
 *  2. io.Reader r2
 */

func MergeReaders(r1, r2 io.Reader) (io.Reader, error) {
	// make strings from r1 and r2
	str1, err := ioutil.ReadAll(r1)
	if err != nil {
		return nil, err
	}
	str2, err := ioutil.ReadAll(r2)
	if err != nil {
		return nil, err
	}
	// match both strings lenghts by trimming the longest
	switch {
	case len(str1) > len(str2):
		str1 = str1[0 : len(str2)-1]
	case len(str2) > len(str1):
		str2 = str2[0 : len(str1)-1]
	}
	// merge both strings alternating
	result := make([]byte, len(str1)+len(str2))
	for i := 0; i < len(result); i++ {
		if i%2 == 0 {
			result[i] = str1[i/2]
		} else {
			result[i] = str2[i/2]
		}
	}
	// return reader with merged string
	return strings.NewReader(string(result)), nil
}

func main() {
	reader := bufio.NewReaderSize(os.Stdin, 16*1024*1024)

	stdout, err := os.Create(os.Getenv("OUTPUT_PATH"))
	checkError(err)

	defer stdout.Close()

	writer := bufio.NewWriterSize(stdout, 16*1024*1024)

	str1 := readLine(reader)

	str2 := readLine(reader)

	if len(str1) > len(str2) {
		str1 = str1[0:len(str2)]
	} else if len(str2) > len(str1) {
		str2 = str2[0:len(str1)]
	}

	r1 := strings.NewReader(str1)
	r2 := strings.NewReader(str2)

	resultReader, err := MergeReaders(r1, r2)
	if err != nil {
		panic(err)
	}

	result, err := ioutil.ReadAll(resultReader)
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(writer, "%s\n", string(result))

	writer.Flush()
}

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
