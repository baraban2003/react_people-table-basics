import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

interface Props {
  person: Person,
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name, sex, born, died, fatherName, motherName, slug, mother, father,
  } = person;

  const { personSlug: selectedUser } = useParams();

  const getClassForWomen
    = (personSex: string | undefined): string | undefined => {
      return personSex === 'f' ? 'has-text-danger' : '';
    };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedUser,
      })}
    >
      <td>
        <Link className={getClassForWomen(sex)} to={`../${slug}`}>
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {!mother?.name
        ? (
          <td>
            {motherName || '-'}
          </td>
        )
        : (
          <td>
            <Link className={getClassForWomen(mother?.sex)} to={`../${mother?.slug}`}>
              {motherName || '-'}
            </Link>
          </td>
        )}
      {!father?.name
        ? (
          <td>
            {fatherName || '-'}
          </td>
        )
        : (
          <td>
            <Link className={getClassForWomen(father?.sex)} to={`../${father?.slug}`}>
              {fatherName || '-'}
            </Link>
          </td>
        )}
    </tr>
  );
};