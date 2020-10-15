-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2020 at 09:14 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emp_managemnet`
--

-- --------------------------------------------------------

--
-- Table structure for table `emp_details`
--

CREATE TABLE `emp_details` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `dob` date NOT NULL,
  `address` varchar(200) NOT NULL,
  `role` varchar(100) NOT NULL,
  `salary` varchar(100) NOT NULL,
  `exp` varchar(20) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `emp_details`
--

INSERT INTO `emp_details` (`id`, `name`, `dob`, `address`, `role`, `salary`, `exp`, `create_date`) VALUES
(2, 'Ritiwk Chavhan', '1999-01-05', 'Deaolameti Amravati Road Nagpur', 'Full Stack Developer', '450036', '4', '2020-10-13 00:00:00'),
(3, 'Michel Stark', '2020-10-21', 'LA', 'Web Developer', '450000', '4', '2020-10-14 11:36:52'),
(6, 'Tony Stark', '2013-06-18', 'Somewhere in USA', 'Iron Man', '890000', '8', '2020-10-15 00:14:48');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(600) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `create_date`) VALUES
(1, 'nidhey@gmail.com', '$2a$10$3xoyiINhOC7hnurl9DHYbe4/MuoKwSnbXtGyxaTuV8M.uxlEbieHK', '2020-10-12 23:23:03'),
(2, 'nidhey1@gmail.com', '$2a$10$vOYUg1cMOwcJusPY0cajz.E6/xjVG6NN1MlM7ZRMMI/HieAVljAWG', '2020-10-12 23:40:45'),
(3, 'admin@gmail.com', '$2a$10$/Y7Po5CmzsHY1rGe8Q8SB.iq527FEYFRz0kh4qRcZFOhSzMYXD6tW', '2020-10-12 23:51:10'),
(4, 'admin@admin.com', '$2a$10$iLhTgXw.sVZqFTa8./f3OecXeCyoTN0mIOI/37oUojZMMe7TslRzS', '2020-10-15 00:13:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emp_details`
--
ALTER TABLE `emp_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `emp_details`
--
ALTER TABLE `emp_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
